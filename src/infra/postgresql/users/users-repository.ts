import { UserModel } from 'src/domain/models/user.model';
import { PrismaClientService } from 'src/infra/orm/prisma/prisma-client.service';
import { UserFindManyFilter } from 'src/domain/usecases/users/find-many';
import { UserFindOneFilter } from 'src/domain/usecases/users/find-one';

import { CreateUserRepository } from 'src/data/usecases/users/db-create-user-repository';
import { DeleteUserRepository } from 'src/data/usecases/users/db-delete-user-repository';
import { ExistUserRepository } from 'src/data/usecases/users/db-exist-user-repository';
import { GetPaginatedUsersRepository } from 'src/data/usecases/users/db-get-paginated-users-repository';
import { GetUserByIdRepository } from 'src/data/usecases/users/db-get-user-by-id-repository';
import { UpdateUserRepository } from 'src/data/usecases/users/db-update-user-repository';
import {
  PaginationInfo,
  PaginatedResult,
} from 'src/domain/commons/pagination.base';
import { OrderedUser } from 'src/domain/usecases/users/get-all-users/get-paginated-users';
import { UserStatus } from '@prisma/client';
import { GetUsersMetricsRepository } from 'src/data/usecases/users/db-get-user-metrics';
import { UserMetrics } from 'src/domain/models/user-metrics';
import { setDate } from 'date-fns';

export class UserPostgresRepository
  implements
    GetPaginatedUsersRepository,
    GetUserByIdRepository,
    CreateUserRepository,
    UpdateUserRepository,
    DeleteUserRepository,
    ExistUserRepository,
    GetUsersMetricsRepository
{
  constructor(private readonly ormService: PrismaClientService) {}

  async getMetrics(): Promise<UserMetrics> {
    const total = await this.ormService.user.count();

    const active = await this.ormService.user.count({
      where: {
        status: 'ACTIVE',
      },
    });

    const inactive = await this.ormService.user.count({
      where: {
        status: 'INACTIVE',
      },
    });

    const totalAdminUsers = await this.ormService.user.count({
      where: {
        permission: 'ADMIN',
      },
    });

    const totalGuestUsers = await this.ormService.user.count({
      where: {
        permission: 'GUEST',
      },
    });

    const lastUsers = await this.ormService.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        createdAt: {
          gte: setDate(new Date(), new Date().getDate() - 7),
        },
      },
      select: {
        name: true,
      },
    });

    return {
      totalActiveUsers: active,
      totalInactiveUsers: inactive,
      totalUsers: total,
      lastUsers: {
        users: lastUsers.map((user) => user.name),
        total: lastUsers.length,
      },
      totalAdminUsers: totalAdminUsers,
      totalGuestUsers: totalGuestUsers,
    };
  }
  async getPaginatedUsers(
    pagination: PaginationInfo,
    ordering: OrderedUser,
    search?: string,
    userId?: number,
  ): Promise<PaginatedResult<UserModel>> {
    const skip = pagination.take * (pagination.page - 1);

    const total = await this.ormService.user.count({
      where: {
        NOT: {
          id: userId,
        },
        OR: [
          {
            name: {
              contains: search || '',
            },
          },
          {
            email: {
              contains: search || '',
            },
          },
          {
            lastName: {
              contains: search || '',
            },
          },
          {
            username: {
              contains: search || '',
            },
          },
          ...((search && search === 'ACTIVE') || search === 'INACTIVE'
            ? [
                {
                  status: {
                    equals: search as UserStatus,
                  },
                },
              ]
            : []),
        ],
      },
    });
    const lastPage = Math.ceil(total / pagination.take);

    let result = await this.ormService.user.findMany({
      skip: skip,
      take: pagination.take,
      orderBy: {
        [ordering.orderBy]: ordering.order,
      },
      where: {
        NOT: {
          id: userId,
        },
        OR: [
          {
            name: {
              contains: search || '',
            },
          },
          {
            email: {
              contains: search || '',
            },
          },
          {
            lastName: {
              contains: search || '',
            },
          },
          {
            username: {
              contains: search || '',
            },
          },
          ...((search && search === 'ACTIVE') || search === 'INACTIVE'
            ? [
                {
                  status: {
                    equals: search as UserStatus,
                  },
                },
              ]
            : []),
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        lastName: true,
        username: true,
        status: true,
        password: false,
        permission: true,
      },
    });

    const currentUser = await this.getById(userId);
    if (currentUser && currentUser.permission === 'ADMIN') {
      result = result.map((user) => {
        if (user.permission === 'ADMIN' || currentUser.permission === 'GUEST') {
          return {
            ...user,
            isRemovable: false,
            isEditable: false,
          };
        }
        return {
          ...user,
          isRemovable: true,
          isEditable: true,
        };
      });
    }
    const meta = {
      total: total,
      lastPage: lastPage,
      currentPage: +pagination.page,
      perPage: +pagination.take,
    };

    return {
      data: result,
      meta,
    };
  }

  async getById(id: number): Promise<UserModel> {
    const record = await this.ormService.user.findUnique({
      where: {
        id: +id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        lastName: true,
        username: true,
        status: true,
        password: false,
        permission: true,
      },
    });

    return record;
  }

  async createUser(user: UserModel): Promise<UserModel> {
    const createUser = await this.ormService.user.create({
      data: {
        email: user.email,
        password: user.password,
        username: user.username,
        name: user.name,
        lastName: user.lastName,
        permission: user.permission,
        status: user.status,
      },
      select: {
        id: true,
        name: true,
        email: true,
        lastName: true,
        username: true,
        status: true,
        password: false,
        permission: true,
      },
    });

    return createUser;
  }

  async updateUser(id: number, user: UserModel): Promise<UserModel> {
    const updatedUser = await this.ormService.user.update({
      where: {
        id: +id,
      },
      data: {
        email: user.email,
        password: user.password,
        username: user.username,
        name: user.name,
        lastName: user.lastName,
        permission: user.permission,
        status: user.status,
      },
      select: {
        id: true,
        name: true,
        email: true,
        lastName: true,
        username: true,
        status: true,
        password: false,
        permission: true,
      },
    });

    return updatedUser;
  }

  async isEditableUser(id: number): Promise<boolean> {
    const user = await this.ormService.user.findUnique({
      where: {
        id: +id,
      },
    });

    return user ? true : false;
  }

  async deleteUser(id: number): Promise<void> {
    await this.ormService.user.delete({
      where: {
        id: +id,
      },
    });
  }

  async isRemovableUser(id: number): Promise<boolean> {
    const user = await this.ormService.user.findUnique({
      where: {
        id: +id,
      },
    });

    return user && user.permission === 'GUEST' ? true : false;
  }

  async existUserWithUsername(username: string): Promise<boolean> {
    const user = await this.ormService.user.findUnique({
      where: {
        username: username,
      },
    });

    return user ? true : false;
  }

  async existUserWithEmail(email: string): Promise<boolean> {
    const user = await this.ormService.user.findUnique({
      where: {
        email: email,
      },
    });

    return user ? true : false;
  }

  async getAll(): Promise<UserModel[]> {
    const result = this.ormService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        lastName: true,
        username: true,
        status: true,
        password: false,
        permission: true,
      },
    });
    return result;
  }

  async findOne(findOneFilter: UserFindOneFilter): Promise<UserModel> {
    return this.ormService.user.findUnique({
      where: {
        id: +findOneFilter.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        lastName: true,
        username: true,
        status: true,
        password: false,
        permission: true,
      },
    });
  }

  async findMany(findManyFilter: UserFindManyFilter): Promise<UserModel[]> {
    return this.ormService.user.findMany({
      where: {
        name: findManyFilter.name ?? undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        lastName: true,
        username: true,
        status: true,
        password: false,
        permission: true,
      },
    });
  }
}

import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Encrypter } from 'src/data/protocols/cryptography/encrypter';
import { DbCreateUser } from 'src/data/protocols/db/users/create-user/create-user';
import { DbDeleteUser } from 'src/data/protocols/db/users/delete-user/delete-user';
import { DbExistUser } from 'src/data/protocols/db/users/exist-user/exist-user';
import { DbGetPaginatedUsers } from 'src/data/protocols/db/users/get-all-users/db-get-paginated-profiles';
import { DbGetUserById } from 'src/data/protocols/db/users/get-user-by-id/db-get-user-by-id';
import { DbGetUsersMetrics } from 'src/data/protocols/db/users/get-users-metrics/get-users-metrics';
import { DbUpdateUser } from 'src/data/protocols/db/users/update-user/update-user';
import { PaginatedResultDTO } from 'src/main/dto/commons/pageable.dto';
import { OrderedUserDTO } from 'src/main/dto/user/get-paginated-users/ordered-user.dto';
import { UserMetricsResponseDto } from 'src/main/dto/user/get-users-metrics/get-users-metrics.dto';
import { PageableDto } from 'src/presentation/dto/utils/pagination.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject() private readonly dbGetPaginatedUsers: DbGetPaginatedUsers,
    @Inject() private readonly dbGetUserById: DbGetUserById,
    @Inject() private readonly dbCreateUser: DbCreateUser,
    @Inject() private readonly dbUpdateUser: DbUpdateUser,
    @Inject() private readonly dbDeleteUser: DbDeleteUser,
    @Inject() private readonly dbExistUser: DbExistUser,
    @Inject() private readonly dbGetUserMetrics: DbGetUsersMetrics,
    @Inject() private readonly encrypter: Encrypter,
  ) {}

  async getMetrics(): Promise<UserMetricsResponseDto> {
    const result = await this.dbGetUserMetrics.getMetrics();
    return result;
  }

  async getAllWithPagination(
    pagination: PageableDto,
    ordering: OrderedUserDTO,
    search?: string,
    userId?: number,
  ): Promise<PaginatedResultDTO<any>> {
    const result = await this.dbGetPaginatedUsers.getAllWithPagination(
      pagination,
      ordering,
      search,
      userId,
    );

    return result;
  }

  async getById(id: number): Promise<any> {
    const user = await this.dbGetUserById.getById(id);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }

  async createUser(userData: any): Promise<any> {
    const existEmail = await this.dbExistUser.existUserWithEmail(
      userData.email,
    );

    if (existEmail) {
      throw new ConflictException('E-mail already registered');
    }

    const existUsername = await this.dbExistUser.existUserWithUsername(
      userData.username,
    );

    if (existUsername) {
      throw new ConflictException('Username already registered');
    }

    const user = { ...userData };

    user.password = await this.encrypter.encrypt(user.password);

    const result = await this.dbCreateUser.create(user);

    return result;
  }

  async updateUser(id: number, userData: any): Promise<any> {
    const currentUser = await this.dbGetUserById.getById(id);

    if (!currentUser) {
      throw new NotFoundException('User Not Found');
    }

    const isEditableUser = await this.dbUpdateUser.isEditableUser(id);

    if (!isEditableUser) {
      throw new UnprocessableEntityException('User is not editable');
    }

    if (currentUser.email != userData.email) {
      const existEmail = await this.dbExistUser.existUserWithEmail(
        userData.email,
      );

      if (existEmail) {
        throw new ConflictException('E-mail already registered');
      }
    }

    if (currentUser.username != userData.username) {
      const existUsername = await this.dbExistUser.existUserWithUsername(
        userData.username,
      );

      if (existUsername) {
        throw new ConflictException('Username already registered');
      }
    }

    const updatedUser = { ...currentUser, ...userData };

    if (userData.password) {
      updatedUser.password = await this.encrypter.encrypt(userData.password);
    }

    const result = await this.dbUpdateUser.update(id, updatedUser);

    return result;
  }

  async deleteUser(id: number) {
    const user = await this.dbGetUserById.getById(id);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    const isRemovableUser = await this.dbDeleteUser.isRemovableUser(id);

    if (!isRemovableUser) {
      throw new UnprocessableEntityException('User is not removable');
    }

    const result = await this.dbDeleteUser.deleteUser(id);
    return result;
  }
}

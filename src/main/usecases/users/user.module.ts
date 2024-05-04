import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../infra/orm/prisma/prisma.module';
import { UserService } from './users.service';
import { EncrypterAdapter } from 'src/infra/cryptography/encrypter';
import { makeDbCreateUser } from 'src/main/factories/users/db-create-user.factory';
import { makeDbDeleteUser } from 'src/main/factories/users/db-delete-user.factory';
import { makeDbExistUser } from 'src/main/factories/users/db-exist-user.factory';
import { makeDbGetPaginatedUsers } from 'src/main/factories/users/db-get-paginated-users';
import { makeDbGetUserById } from 'src/main/factories/users/db-get-user-by-id';
import { makeDbUpdateUser } from 'src/main/factories/users/db-update-user.factory';
import { CreateUser } from 'src/presentation/controllers/user/create-user/create-user.controller';
import { DeleteUser } from 'src/presentation/controllers/user/delete-user/delete-user.controller';
import { GetUsers } from 'src/presentation/controllers/user/get-users/get-user.controller';
import { UpdateUser } from 'src/presentation/controllers/user/update-user/update-user.controller';
import { makeDbGetUsersMetricsRepository } from 'src/main/factories/users/db-get-users-metrics.factory copy';
import { GetUsersMetrics } from 'src/presentation/controllers/user/get-user-metrics/get-user-metric-controller';

@Module({
  imports: [PrismaModule],
  controllers: [GetUsersMetrics, GetUsers, CreateUser, UpdateUser, DeleteUser],
  providers: [
    {
      provide: UserService,
      useFactory: () => {
        const dbGetPaginatedUsers = makeDbGetPaginatedUsers();
        const dbGetUserById = makeDbGetUserById();
        const dbCreateUser = makeDbCreateUser();
        const dbUpdateUser = makeDbUpdateUser();
        const dbDeleteUser = makeDbDeleteUser();
        const dbExistUser = makeDbExistUser();
        const dbGetUserMetrics = makeDbGetUsersMetricsRepository();

        const encrypter = new EncrypterAdapter(10);

        return new UserService(
          dbGetPaginatedUsers,
          dbGetUserById,
          dbCreateUser,
          dbUpdateUser,
          dbDeleteUser,
          dbExistUser,
          dbGetUserMetrics,
          encrypter,
        );
      },
    },
  ],
  exports: [UserService],
})
export class UsersModule {}

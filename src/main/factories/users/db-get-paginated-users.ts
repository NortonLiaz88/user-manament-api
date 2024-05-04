import { DbGetPaginatedUsers } from 'src/data/protocols/db/users/get-all-users/db-get-paginated-profiles';
import { PrismaClientService } from 'src/infra/orm/prisma/prisma-client.service';
import { UserPostgresRepository } from 'src/infra/postgresql/users/users-repository';

export const makeDbGetPaginatedUsers = (): DbGetPaginatedUsers => {
  const userPostgresRepository = new UserPostgresRepository(
    new PrismaClientService(),
  );
  return new DbGetPaginatedUsers(userPostgresRepository);
};

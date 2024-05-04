import { DbGetAllUsers } from 'src/data/usecases/users/db-get-all-users';
import { PrismaClientService } from 'src/infra/orm/prisma/prisma-client.service';
import { UserPostgresRepository } from 'src/infra/postgresql/users/users-repository';

export const makeDbGetAll = (): DbGetAllUsers => {
  const userPostgresRepository = new UserPostgresRepository(
    new PrismaClientService(),
  );
  return new DbGetAllUsers(userPostgresRepository);
};

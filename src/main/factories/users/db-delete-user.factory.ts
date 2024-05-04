import { DbDeleteUser } from 'src/data/protocols/db/users/delete-user/delete-user';
import { PrismaClientService } from 'src/infra/orm/prisma/prisma-client.service';
import { UserPostgresRepository } from 'src/infra/postgresql/users/users-repository';

export const makeDbDeleteUser = (): DbDeleteUser => {
  const deleteUserPostgresRepository = new UserPostgresRepository(
    new PrismaClientService(),
  );

  return new DbDeleteUser(deleteUserPostgresRepository);
};

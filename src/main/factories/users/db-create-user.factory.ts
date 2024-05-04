import { DbCreateUser } from 'src/data/protocols/db/users/create-user/create-user';
import { PrismaClientService } from 'src/infra/orm/prisma/prisma-client.service';
import { UserPostgresRepository } from 'src/infra/postgresql/users/users-repository';

export const makeDbCreateUser = (): DbCreateUser => {
  const createUserPostgresRepository = new UserPostgresRepository(
    new PrismaClientService(),
  );

  return new DbCreateUser(createUserPostgresRepository);
};

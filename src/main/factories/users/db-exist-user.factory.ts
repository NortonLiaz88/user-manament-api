import { DbExistUser } from 'src/data/protocols/db/users/exist-user/exist-user';
import { PrismaClientService } from 'src/infra/orm/prisma/prisma-client.service';
import { UserPostgresRepository } from 'src/infra/postgresql/users/users-repository';

export const makeDbExistUser = (): DbExistUser => {
  const existUserPostgresRepository = new UserPostgresRepository(
    new PrismaClientService(),
  );

  return new DbExistUser(existUserPostgresRepository);
};

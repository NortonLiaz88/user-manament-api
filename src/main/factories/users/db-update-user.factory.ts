import { DbUpdateUser } from 'src/data/protocols/db/users/update-user/update-user';
import { PrismaClientService } from 'src/infra/orm/prisma/prisma-client.service';
import { UserPostgresRepository } from 'src/infra/postgresql/users/users-repository';

export const makeDbUpdateUser = (): DbUpdateUser => {
  const updateUserPostgresRepository = new UserPostgresRepository(
    new PrismaClientService(),
  );

  return new DbUpdateUser(updateUserPostgresRepository);
};

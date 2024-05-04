import { DbGetAccountById } from '../../../data/usecases/account/get-account/db-get-account';
import { PrismaClientService } from 'src/infra/orm/prisma/prisma-client.service';
import { AccountPostgresRepository } from 'src/infra/postgresql/account/account-postgres.repository';

export const makeDbGetAccountById = (): DbGetAccountById => {
  const accountPostgresRepository = new AccountPostgresRepository(
    new PrismaClientService(),
  );

  return new DbGetAccountById(accountPostgresRepository);
};

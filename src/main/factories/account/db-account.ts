import { DbAddAccount } from '../../../data/usecases/account/add-account/db-add-account';
import { EncrypterAdapter } from 'src/infra/cryptography/encrypter';
import { PrismaClientService } from 'src/infra/orm/prisma/prisma-client.service';
import { AccountPostgresRepository } from 'src/infra/postgresql/account/account-postgres.repository';

export const makeDbAddAccount = (): DbAddAccount => {
  const accountPostgresRepository = new AccountPostgresRepository(
    new PrismaClientService(),
  );

  const encrypter = new EncrypterAdapter(10);

  return new DbAddAccount(
    accountPostgresRepository,
    accountPostgresRepository,
    accountPostgresRepository,
    encrypter,
  );
};

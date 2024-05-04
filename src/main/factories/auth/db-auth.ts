import { JwtService } from '@nestjs/jwt';
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication';
import { HashComparerAdapter } from 'src/infra/cryptography/comparer';
import { TokenGeneratorAdapter } from 'src/infra/cryptography/token-generator';
import { PrismaClientService } from 'src/infra/orm/prisma/prisma-client.service';
import { AccountPostgresRepository } from 'src/infra/postgresql/account/account-postgres.repository';

export const makeDbAuthentication = (): DbAuthentication => {
  const accountPostgresRepository = new AccountPostgresRepository(
    new PrismaClientService(),
  );

  const hashComparer = new HashComparerAdapter();
  const tokenGenerator = new TokenGeneratorAdapter(new JwtService());
  return new DbAuthentication(
    accountPostgresRepository,
    hashComparer,
    tokenGenerator,
  );
};

import { DbGetUsersMetrics } from 'src/data/protocols/db/users/get-users-metrics/get-users-metrics';
import { PrismaClientService } from 'src/infra/orm/prisma/prisma-client.service';
import { UserPostgresRepository } from 'src/infra/postgresql/users/users-repository';

export const makeDbGetUsersMetricsRepository = (): DbGetUsersMetrics => {
  const getUsersMetricsRepository = new UserPostgresRepository(
    new PrismaClientService(),
  );

  return new DbGetUsersMetrics(getUsersMetricsRepository);
};

import { DbViewUserProfile } from 'src/data/usecases/user-profile/view-user-profile/db-view-user-profile';
import { PrismaClientService } from 'src/infra/orm/prisma/prisma-client.service';
import { UserProfilePostgresRepository } from 'src/infra/postgresql/user-profile/user-profile-postgres.respository';

export const makeDbViewUserProfile = (): DbViewUserProfile => {
  const userProfilePostgresRepository = new UserProfilePostgresRepository(
    new PrismaClientService(),
  );
  return new DbViewUserProfile(userProfilePostgresRepository);
};

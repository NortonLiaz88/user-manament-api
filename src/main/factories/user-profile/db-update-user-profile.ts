import { DbUpdateUserProfile } from 'src/data/usecases/user-profile/update-user-profile/db-update-user-profile';
import { PrismaClientService } from 'src/infra/orm/prisma/prisma-client.service';
import { UserProfilePostgresRepository } from 'src/infra/postgresql/user-profile/user-profile-postgres.respository';

export const makeDbUpdateUserProfile = (): DbUpdateUserProfile => {
  const updateUserProfilePostgresRepository = new UserProfilePostgresRepository(
    new PrismaClientService(),
  );

  return new DbUpdateUserProfile(updateUserProfilePostgresRepository);
};

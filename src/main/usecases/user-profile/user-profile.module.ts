import { PrismaModule } from 'src/infra/orm/prisma/prisma.module';
import { UserProfileService } from './use-profile.service';
import { Module } from '@nestjs/common';
import { EncrypterAdapter } from 'src/infra/cryptography/encrypter';
import { GetUserProfileController } from 'src/presentation/controllers/user-profile/view-user-profile/view-user-profile.controller';
import { UpdateUserProfileController } from 'src/presentation/controllers/user-profile/update-user-profile/update-user-profile.controller';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { HashComparerAdapter } from 'src/infra/cryptography/comparer';
import { makeDbUpdateUserProfile } from 'src/main/factories/user-profile/db-update-user-profile';
import { makeDbViewUserProfile } from 'src/main/factories/user-profile/db-view-user-profile';
import { makeDbExistUser } from 'src/main/factories/users/db-exist-user.factory';

@Module({
  imports: [
    PrismaModule,
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  ],
  controllers: [GetUserProfileController, UpdateUserProfileController],
  providers: [
    {
      provide: UserProfileService,
      useFactory: () => {
        const dbViewUserProfile = makeDbViewUserProfile();
        const dbUpdateUserProfile = makeDbUpdateUserProfile();
        const dbExistUser = makeDbExistUser();
        const encrypter = new EncrypterAdapter(10);
        const hashComparer = new HashComparerAdapter();

        return new UserProfileService(
          dbViewUserProfile,
          dbUpdateUserProfile,
          dbExistUser,
          encrypter,
          hashComparer,
        );
      },
    },
  ],
  exports: [],
})
export class UserProfileModule {}

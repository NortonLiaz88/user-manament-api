
import { UpdateUserProfileRepository } from 'src/data/protocols/db/user-profile/db-update-user-profile-repository';
import { UserProfileStrictModel, UserProfileFullModel } from 'src/domain/models/user-profile.entity';
import { UpdateUserProfile } from 'src/domain/usecases/user-profile/update-user-profile/update-user-profile';

export class DbUpdateUserProfile implements UpdateUserProfile {
  constructor(
    private readonly updateUserProfileRepository: UpdateUserProfileRepository,
  ) {}
  update(
    userId: number,
    userProfile: UserProfileStrictModel,
  ): Promise<UserProfileFullModel> {
    return this.updateUserProfileRepository.updateUserProfile(
      userId,
      userProfile,
    );
  }
}

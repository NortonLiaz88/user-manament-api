import { ViewUserProfileRepository } from 'src/data/protocols/db/user-profile/db-view-user-profile-repository';
import { UserProfileFullModel } from 'src/domain/models/user-profile.entity';
import { ViewUserProfile } from 'src/domain/usecases/user-profile/view-user-profile/view-user-profile';

export class DbViewUserProfile implements ViewUserProfile {
  constructor(
    private readonly viewUserProfileRepository: ViewUserProfileRepository,
  ) {}
  viewProfileByUseId(userId: number): Promise<UserProfileFullModel> {
    return this.viewUserProfileRepository.getUserProfile(userId);
  }
}

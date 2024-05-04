import { UserProfileFullModel } from 'src/domain/models/user-profile.entity';

export interface ViewUserProfile {
  viewProfileByUseId(userId: number): Promise<UserProfileFullModel>;
}

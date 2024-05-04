import {
  UserProfileFullModel,
  UserProfileStrictModel,
} from 'src/domain/models/user-profile.entity';

export interface UpdateUserProfile {
  update(
    userId: number,
    userProfile: UserProfileStrictModel,
  ): Promise<UserProfileFullModel>;
}

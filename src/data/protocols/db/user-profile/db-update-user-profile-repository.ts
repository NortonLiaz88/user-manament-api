import { UserProfileStrictModel, UserProfileFullModel } from "src/domain/models/user-profile.entity";


export interface UpdateUserProfileRepository {
  updateUserProfile(
    userId: number,
    userProfile: UserProfileStrictModel,
  ): Promise<UserProfileFullModel>;
}

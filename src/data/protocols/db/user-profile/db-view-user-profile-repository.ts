import { UserProfileFullModel } from "src/domain/models/user-profile.entity";

export interface ViewUserProfileRepository {
  getUserProfile(userId: number): Promise<UserProfileFullModel>;
}

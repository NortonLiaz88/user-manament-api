import { UpdateUserProfileRepository } from 'src/data/protocols/db/user-profile/db-update-user-profile-repository';
import { ViewUserProfileRepository } from 'src/data/protocols/db/user-profile/db-view-user-profile-repository';
import {
  UserProfileFullModel,
  UserProfileStrictModel,
} from 'src/domain/models/user-profile.entity';
import { MinioService } from 'src/infra/minio/minio-client.service';

import { PrismaClientService } from 'src/infra/orm/prisma/prisma-client.service';

const MINIO_USER_PROFILE_PATH = process.env.MINIO_USER_PROFILE_PATH;

export class UserProfilePostgresRepository
  implements ViewUserProfileRepository, UpdateUserProfileRepository
{
  constructor(private readonly ormService: PrismaClientService) {}
  async getUserProfile(userId: number): Promise<UserProfileFullModel> {
    const result = await this.ormService.user.findFirst({
      where: { id: userId },
    });

    if (!result) {
      return null;
    }

    // if (result?.profileImage != null) {
    //   result.profileImageUrl = await new MinioService().getUrl(
    //     `${MINIO_USER_PROFILE_PATH}/${result.profileImage}`,
    //   );
    // }
    return result;
  }

  async updateUserProfile(
    userId: number,
    userProfile: UserProfileStrictModel,
  ): Promise<UserProfileFullModel> {
    const userData = {
      email: userProfile.email,
      name: userProfile.name,
      lastName: userProfile.lastName,
      username: userProfile.username,
      permission: userProfile.permission,
    };

    if (userProfile.password) {
      userData['password'] = userProfile.password;
    }

    // let profileImageUrl: string;

    // if (userProfile.profileImage) {
    //   profileImageUrl = await new MinioService().addFile(
    //     `${MINIO_USER_PROFILE_PATH}/${userId}`,
    //     userProfile.profileImage.data,
    //     userProfile.profileImage.mimeType,
    //   );
    //   userData['profileImage'] = '' + userId;
    // } else {
    //   userData['profileImage'] = null;
    // }
    const result = await this.ormService.user.update({
      where: { id: userId },
      data: userData,
    });

    return Object.assign(result);
  }
}

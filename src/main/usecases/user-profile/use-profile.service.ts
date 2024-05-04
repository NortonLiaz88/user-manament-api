import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Encrypter } from 'src/data/protocols/cryptography/encrypter';
import { HashComparer } from 'src/data/protocols/cryptography/hash-comparer';
import { DbExistUser } from 'src/data/protocols/db/users/exist-user/exist-user';
import { DbUpdateUserProfile } from 'src/data/usecases/user-profile/update-user-profile/db-update-user-profile';
import { DbViewUserProfile } from 'src/data/usecases/user-profile/view-user-profile/db-view-user-profile';
import { FileStorage } from 'src/domain/models/user-profile.entity';

import { UserProfileUpdateDto } from 'src/main/dto/user-profile/update-user-profile/update-user-profile.dto';
import { UserProfileResponseDto } from 'src/main/dto/user-profile/view-user-profile/view-user-profile.dto';

@Injectable()
export class UserProfileService {
  constructor(
    @Inject() private readonly dbViewUserProfile: DbViewUserProfile,
    @Inject() private readonly dbUpdateUserProfile: DbUpdateUserProfile,
    @Inject() private readonly dbExistUser: DbExistUser,
    @Inject() private readonly encrypter: Encrypter,
    @Inject() private readonly hashComparer: HashComparer,
  ) {}

  async viewUserProfile(userId: number): Promise<UserProfileResponseDto> {
    const currentUser = await this.dbViewUserProfile.viewProfileByUseId(userId);

    if (!currentUser) {
      throw new NotFoundException('User Not Found');
    }

    currentUser.password = undefined;

    return {
      createdAt: currentUser.createdAt,
      email: currentUser.email,
      id: currentUser.id,
      name: currentUser.name,
      username: currentUser.username,
      profileImageUrl: currentUser.profileImageUrl,
      lastName: currentUser.lastName,
      permission: currentUser.permission,
    };
  }

  async updateUserProfile(
    userId: number,
    userData: UserProfileUpdateDto,
  ): Promise<UserProfileResponseDto> {
    const currentUser = await this.dbViewUserProfile.viewProfileByUseId(userId);

    if (!currentUser) {
      throw new NotFoundException('User Not Found');
    }

    if (currentUser.email != userData.email) {
      const existEmail = await this.dbExistUser.existUserWithEmail(
        userData.email,
      );

      if (existEmail) {
        throw new ConflictException('E-mail already registered');
      }
    }

    if (currentUser.username != userData.username) {
      const existUsername = await this.dbExistUser.existUserWithUsername(
        userData.username,
      );

      if (existUsername) {
        throw new ConflictException('Username already registered');
      }
    }

    let newPassword: string;

    if (userData.newPassword) {
      const isMatchingPassword = await this.hashComparer.compare(
        userData.oldPassword,
        currentUser.password,
      );

      if (!isMatchingPassword) {
        throw new BadRequestException(
          'Old password does not match with current password',
        );
      }

      newPassword = await this.encrypter.encrypt(userData.newPassword);
    }

    let profileImage: FileStorage;

    if (userData.profileImage) {
      profileImage = {
        data: userData.profileImage.buffer,
        filename: userData.profileImage.originalName,
        size: userData.profileImage.size,
        mimeType: userData.profileImage.mimeType,
      };
    }

    const updatedUser = {
      ...userData,
      password: newPassword,
      profileImage,
    };

    const result = await this.dbUpdateUserProfile.update(userId, {
      email: updatedUser.email,
      name: updatedUser.name,
      lastName: updatedUser.lastName,
      username: updatedUser.username,
      ...(updatedUser.password && { password: updatedUser.password }),
    });

    result.password = undefined;

    return {
      ...result,
    };
  }
}

import { Permission, UserStatus } from '@prisma/client';

export interface FileStorage {
  data: Buffer;
  size: number;
  filename: string;
  mimeType: string;
}

export interface UserProfileStrictModel {
  name: string;

  lastName: string;

  email: string;

  username: string;

  permission?: Permission;

  password?: string;

  profileImage?: FileStorage;
}

export interface UserProfileFullModel {
  id: number;

  name: string;

  lastName: string;

  email: string;

  username: string;

  password: string;

  profileImageUrl?: string;

  permission: Permission;

  status: UserStatus;

  createdAt: Date;
}

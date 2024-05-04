import { Permission, UserStatus } from '@prisma/client';

export interface UserModel {
  id: number;
  email: string;
  username: string;
  name: string;
  lastName: string;
  permission: Permission;
  status: UserStatus;
  password?: string;
}

import { Permission } from '@prisma/client';

export interface AccountModel {
  id?: string;
  name: string;
  email: string;
  password: string;
  rules: Permission;
}

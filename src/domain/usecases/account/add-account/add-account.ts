import { UserPermission } from 'src/enums/user-permission';

export interface AddAccountModel {
  email: string;
  name: string;
  username: string;
  password: string;
  lastName: string;
  permission: UserPermission;
}

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<void>;
}

import { UserModel } from 'src/domain/models/user.model';

export interface GetAllUsers {
  getAll: () => Promise<UserModel[]>;
}

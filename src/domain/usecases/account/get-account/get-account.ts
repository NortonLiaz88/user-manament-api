import { UserModel } from 'src/domain/models/user.model';

export interface GetAccountById {
  getById: (id: number) => Promise<UserModel>;
}

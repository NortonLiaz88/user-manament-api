import { UserModel } from 'src/domain/models/user.model';

export interface GetUserById {
  getById(id: number): Promise<UserModel>;
}

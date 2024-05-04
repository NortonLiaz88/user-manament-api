import { UserModel } from 'src/domain/models/user.model';

export interface CreateUser {
  create(request: UserModel): Promise<UserModel>;
}

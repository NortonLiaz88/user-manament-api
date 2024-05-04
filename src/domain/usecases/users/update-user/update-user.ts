import { UserModel } from 'src/domain/models/user.model';

export interface UpdateUser {
  update(id: number, request: UserModel): Promise<UserModel>;

  isEditableUser(id: number): Promise<boolean>;
}

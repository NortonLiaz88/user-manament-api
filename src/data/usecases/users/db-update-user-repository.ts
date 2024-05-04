import { UserModel } from "src/domain/models/user.model";

export interface UpdateUserRepository {
  updateUser(id: number, user: UserModel): Promise<UserModel>;

  isEditableUser(id: number): Promise<boolean>;
}

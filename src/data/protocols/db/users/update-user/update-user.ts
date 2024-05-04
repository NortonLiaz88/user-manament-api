import { UpdateUserRepository } from "src/data/usecases/users/db-update-user-repository";
import { UserModel } from "src/domain/models/user.model";
import { UpdateUser } from "src/domain/usecases/users/update-user/update-user";

export class DbUpdateUser implements UpdateUser {
  constructor(private readonly updateUserRepository: UpdateUserRepository) {}

  async update(id: number, user: UserModel): Promise<UserModel> {
    return await this.updateUserRepository.updateUser(id, user);
  }

  async isEditableUser(id: number): Promise<boolean> {
    return await this.updateUserRepository.isEditableUser(id);
  }
}

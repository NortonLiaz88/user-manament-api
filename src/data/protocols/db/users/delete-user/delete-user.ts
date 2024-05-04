import { DeleteUserRepository } from "src/data/usecases/users/db-delete-user-repository";
import { DeleteUser } from "src/domain/usecases/users/delete-user/delete-user";


export class DbDeleteUser implements DeleteUser {
  constructor(private readonly deleteUserRepository: DeleteUserRepository) {}

  async deleteUser(id: number): Promise<void> {
    return await this.deleteUserRepository.deleteUser(id);
  }

  async isRemovableUser(id: number): Promise<boolean> {
    return await this.deleteUserRepository.isRemovableUser(id);
  }
}

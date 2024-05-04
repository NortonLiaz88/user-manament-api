import { GetAllUsersRepository } from "src/data/protocols/db/users/get-all-users/db-get-all-users";
import { UserModel } from "src/domain/models/user.model";
import { GetAllUsers } from "src/domain/usecases/users/get-all-users";


export class DbGetAllUsers implements GetAllUsers {
  constructor(private readonly getUsersRepository: GetAllUsersRepository) {}

  async getAll(): Promise<UserModel[]> {
    return await this.getUsersRepository.getAll();
  }
}

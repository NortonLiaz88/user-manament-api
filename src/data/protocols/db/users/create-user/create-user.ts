import { CreateUserRepository } from "src/data/usecases/users/db-create-user-repository";
import { UserModel } from "src/domain/models/user.model";
import { CreateUser } from "src/domain/usecases/users/create-user/create-users";

export class DbCreateUser implements CreateUser {
  constructor(private readonly createUserRepository: CreateUserRepository) {}

  async create(user: UserModel): Promise<UserModel> {
    return await this.createUserRepository.createUser(user);
  }
}

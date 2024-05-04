import { GetUserByIdRepository } from "src/data/usecases/users/db-get-user-by-id-repository";
import { UserModel } from "src/domain/models/user.model";
import { GetUserById } from "src/domain/usecases/users/get-user/get-user-by-id";

export class DbGetUserById implements GetUserById {
  constructor(private readonly getUserByIdRepository: GetUserByIdRepository) {}

  getById(id: number): Promise<UserModel> {
    return this.getUserByIdRepository.getById(id);
  }
}

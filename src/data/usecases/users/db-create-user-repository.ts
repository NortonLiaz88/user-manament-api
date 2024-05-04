import { UserModel } from "src/domain/models/user.model";

export interface CreateUserRepository {
  createUser(user: UserModel): Promise<UserModel>;
}

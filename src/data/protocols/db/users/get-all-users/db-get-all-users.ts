import { UserModel } from "src/domain/models/user.model";

export interface GetAllUsersRepository {
  getAll(): Promise<UserModel[]>;
}

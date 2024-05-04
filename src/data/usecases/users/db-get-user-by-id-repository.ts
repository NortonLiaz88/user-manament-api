import { UserModel } from "src/domain/models/user.model";

export interface GetUserByIdRepository {
  getById(id: number): Promise<UserModel>;
}

import { UserModel } from "src/domain/models/user.model";

export interface GetAccountByIdRepository {
  getById: (id: number) => Promise<UserModel | null>;
}

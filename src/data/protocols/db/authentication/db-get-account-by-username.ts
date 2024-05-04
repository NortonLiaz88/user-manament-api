import { UserModel } from "src/domain/models/user.model";

export interface GetAccountByUsernameRepository {
  getByUsername: (username: string) => Promise<UserModel | null>;
}

import { UserModel } from 'src/domain/models/user.model';

export interface GetAccountByEmailRepository {
  getByEmail: (email: string) => Promise<UserModel | null>;
}

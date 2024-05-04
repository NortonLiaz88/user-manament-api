import { UserModel } from 'src/domain/models/user.model';

export interface UserFindOneFilter {
  id: number;
}

export interface FindOneUser {
  findOne: (findOneFilter: UserFindOneFilter) => Promise<UserModel>;
}

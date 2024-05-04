import { UserModel } from 'src/domain/models/user.model';

export interface UserFindManyFilter {
  name?: string;
}

export interface FindManyUsers {
  findMany: (findManyFilter: UserFindManyFilter) => Promise<UserModel[]>;
}

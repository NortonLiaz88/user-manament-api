import { PaginationInfo, PaginatedResult } from "src/domain/commons/pagination.base";
import { UserModel } from "src/domain/models/user.model";
import { OrderedUser } from "src/domain/usecases/users/get-all-users/get-paginated-users";


export interface GetPaginatedUsersRepository {
  getPaginatedUsers(
    pagination: PaginationInfo,
    ordering: OrderedUser,
    search?: string,
    userId?: number,
  ): Promise<PaginatedResult<UserModel>>;
}

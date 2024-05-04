import { GetPaginatedUsersRepository } from "src/data/usecases/users/db-get-paginated-users-repository";
import { PaginatedResult, PaginationInfo } from "src/domain/commons/pagination.base";
import { UserModel } from "src/domain/models/user.model";
import { GetPaginatedUsers, OrderedUser } from "src/domain/usecases/users/get-all-users/get-paginated-users";

export class DbGetPaginatedUsers implements GetPaginatedUsers {
  constructor(
    private readonly getPaginatedUsersRepository: GetPaginatedUsersRepository,
  ) {}

  getAllWithPagination(
    pagination: PaginationInfo,
    ordering: OrderedUser,
    search?: string,
    userId?: number,
  ): Promise<PaginatedResult<UserModel>> {
    return this.getPaginatedUsersRepository.getPaginatedUsers(
      pagination,
      ordering,
      search,
      userId
    );
  }
}

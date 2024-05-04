import { GetUsersMetricsRepository } from "src/data/usecases/users/db-get-user-metrics";
import { UserMetrics } from "src/domain/models/user-metrics";
import { GetUsersMetrics } from "src/domain/usecases/users/get-users-metrics/get-users-metrics";

export class DbGetUsersMetrics implements GetUsersMetrics {
  constructor(private readonly getUsersMetricsRepository: GetUsersMetricsRepository) {}

  async getMetrics(): Promise<UserMetrics> {
    return this.getUsersMetricsRepository.getMetrics();
  }
}
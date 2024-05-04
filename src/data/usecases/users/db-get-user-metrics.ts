import { UserMetrics } from "src/domain/models/user-metrics";

export interface GetUsersMetricsRepository {
    getMetrics(): Promise<UserMetrics>;
}
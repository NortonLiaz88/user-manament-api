import { UserMetrics } from 'src/domain/models/user-metrics';

export interface GetUsersMetrics {
  getMetrics(): Promise<UserMetrics>;
}

export interface UserMetrics {
  totalUsers: number;
  totalActiveUsers: number;
  totalInactiveUsers: number;
  totalAdminUsers: number;
  totalGuestUsers: number;
  lastUsers: {
    total: number;
    users: string[];
  };
}

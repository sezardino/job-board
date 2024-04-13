import { apiService } from "@/services/api";
import { AdminStatisticsRequest } from "@/services/bll/modules/statistics/schema";
import { useQuery } from "@tanstack/react-query";

export const USERS_STATISTICS = "users-statistics";

export const useUsersStatisticsQuery = (params: AdminStatisticsRequest) =>
  useQuery({
    queryKey: [USERS_STATISTICS, ...Object.values(params)],
    queryFn: () => apiService.statistics.admin(params),
  });

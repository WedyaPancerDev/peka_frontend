import { UseQueryResult, useQuery } from "@tanstack/react-query";

import type { ApiResponse } from "types/response";
import {
  UserDashboardResponse,
  UsersResponse,
  getUserDashboard,
  getUsers,
} from "services/users";

const useUsers = (): UseQueryResult<ApiResponse<UsersResponse[]>, Error> => {
  const QUERY_KEY = ["users-key"];

  const staleOneDay = 1000 * 60 * 60 * 24;

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => await getUsers(),
    staleTime: staleOneDay,
    retry: false,
  });
};

const useUserDashboard = (): UseQueryResult<
  ApiResponse<UserDashboardResponse>,
  Error
> => {
  const QUERY_KEY = ["users-dashboard-key"];

  const staleOneDay = 1000 * 60 * 60 * 24;

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => await getUserDashboard(),
    staleTime: staleOneDay,
    retry: false,
  });
};

export { useUsers, useUserDashboard };

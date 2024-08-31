import { UseQueryResult, useQuery } from "@tanstack/react-query";

import type { ApiResponse } from "types/response";
import { getModules, type ModuleResponse } from "services/modul";

const useAllModule = (): UseQueryResult<
  ApiResponse<ModuleResponse[]>,
  Error
> => {
  const QUERY_KEY = ["modules-key"];

  const staleOneDay = 1000 * 60 * 60 * 24;

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => await getModules(),
    staleTime: staleOneDay,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    retry: false,
  });
};

export { useAllModule };

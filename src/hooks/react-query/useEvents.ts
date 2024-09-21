import { UseQueryResult, useQuery } from "@tanstack/react-query";

import type { ApiResponse } from "types/response";
import { EventResponse, getEvents } from "services/events";

const useEvents = (): UseQueryResult<ApiResponse<EventResponse[]>, Error> => {
  const QUERY_KEY = ["events-key"];

  const staleOneDay = 1000 * 60 * 60 * 24;

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => await getEvents(),
    staleTime: staleOneDay,
    retry: false,
  });
};

export { useEvents };

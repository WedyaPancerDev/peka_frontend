import { UseQueryResult, useQuery } from "@tanstack/react-query";

import type { ApiResponse } from "types/response";
import { type NewsResponse, getNews } from "services/news";

const useNews = (): UseQueryResult<ApiResponse<NewsResponse[]>, Error> => {
  const QUERY_KEY = ["news-key"];

  const staleOneDay = 1000 * 60 * 60 * 24;

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => await getNews(),
    staleTime: staleOneDay,
    retry: false,
  });
};

export { useNews };

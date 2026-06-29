import { useQuery } from "@tanstack/react-query";
import { getVideos } from "../api/video.api";

type UseSearchProps = {
  query: string;
  page?: number;
};

export const useSearch = ({
  query,
  page = 1,
}: UseSearchProps) => {
  return useQuery({
    queryKey: ["search", query, page],

    queryFn: () =>
      getVideos({
        query,
        page,
        limit: 10,
        sortBy: "createdAt",
        sortType: "desc",
      }),

    enabled: !!query.trim(),
  });
};
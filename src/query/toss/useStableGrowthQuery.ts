import { fetchToss } from "@/fetch/fetchToss";
import { useQuery } from "@tanstack/react-query";

export const useStableGrowthQuery = () =>
  useQuery({
    queryKey: ["useStableGrowth"],
    queryFn: () => fetchToss.fetchStableGrowth(),
    staleTime: 1000 * 60 * 60, // 1시간 (3600000 밀리초)
  });

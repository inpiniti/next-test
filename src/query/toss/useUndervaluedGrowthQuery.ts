import { fetchToss } from "@/fetch/fetchToss";
import { useQuery } from "@tanstack/react-query";

export const useUndervaluedGrowthQuery = () =>
  useQuery({
    queryKey: ["useUndervaluedGrowth"],
    queryFn: () => fetchToss.fetchUndervaluedGrowth(),
    staleTime: 1000 * 60 * 60, // 1시간 (3600000 밀리초)
  });

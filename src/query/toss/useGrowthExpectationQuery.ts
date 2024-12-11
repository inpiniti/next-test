import { fetchToss } from "@/fetch/fetchToss";
import { useQuery } from "@tanstack/react-query";

export const useGrowthExpectationQuery = () =>
  useQuery({
    queryKey: ["useGrowthExpectation"],
    queryFn: () => fetchToss.fetchGrowthExpectation(),
    staleTime: 1000 * 60 * 60, // 1시간 (3600000 밀리초)
  });

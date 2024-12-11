import { fetchToss } from "@/fetch/fetchToss";
import { useQuery } from "@tanstack/react-query";

export const useConsistentDividendQuery = () =>
  useQuery({
    queryKey: ["useConsistentDividend"],
    queryFn: () => fetchToss.fetchConsistentDividend(),
    staleTime: 1000 * 60 * 60, // 1시간 (3600000 밀리초)
  });

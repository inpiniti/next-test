import { fetchToss } from "@/fetch/fetchToss";
import { useQuery } from "@tanstack/react-query";

export const useInexpensiveValueQuery = () =>
  useQuery({
    queryKey: ["useInexpensiveValue"],
    queryFn: () => fetchToss.fetchInexpensiveValue(),
    staleTime: 1000 * 60 * 60, // 1시간 (3600000 밀리초)
  });

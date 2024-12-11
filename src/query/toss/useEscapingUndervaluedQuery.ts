import { fetchToss } from "@/fetch/fetchToss";
import { useQuery } from "@tanstack/react-query";

export const useEscapingUndervaluedQuery = () =>
  useQuery({
    queryKey: ["useEscapingUndervalued"],
    queryFn: () => fetchToss.fetchEscapingUndervalued(),
    staleTime: 1000 * 60 * 60, // 1시간 (3600000 밀리초)
  });

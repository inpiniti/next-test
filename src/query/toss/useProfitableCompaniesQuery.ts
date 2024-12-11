import { fetchToss } from "@/fetch/fetchToss";
import { useQuery } from "@tanstack/react-query";

export const useProfitableCompaniesQuery = () =>
  useQuery({
    queryKey: ["useProfitableCompanies"],
    queryFn: () => fetchToss.fetchProfitableCompanies(),
    staleTime: 1000 * 60 * 60, // 1시간 (3600000 밀리초)
  });

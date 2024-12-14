import { fetchToss } from '@/fetch/fetchToss';
import { useQuery } from '@tanstack/react-query';
import { basic } from '@/query/option';

export const useProfitableCompaniesQuery = () =>
  useQuery({
    queryKey: ['useProfitableCompanies'],
    queryFn: () => fetchToss.fetchProfitableCompanies(),
    ...basic,
  });

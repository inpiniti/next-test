import { fetchToss } from '@/fetch/fetchToss';
import { useQuery } from '@tanstack/react-query';
import { basic } from '@/query/option';

export const useHighProfitUndervaluedQuery = () =>
  useQuery({
    queryKey: ['useHighProfitUndervalued'],
    queryFn: () => fetchToss.fetchHighProfitUndervalued(),
    ...basic,
  });

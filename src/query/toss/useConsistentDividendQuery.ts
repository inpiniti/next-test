import { fetchToss } from '@/fetch/fetchToss';
import { useQuery } from '@tanstack/react-query';
import { basic } from '@/query/option';

export const useConsistentDividendQuery = () =>
  useQuery({
    queryKey: ['useConsistentDividend'],
    queryFn: () => fetchToss.fetchConsistentDividend(),
    ...basic,
  });

import { fetchToss } from '@/fetch/fetchToss';
import { useQuery } from '@tanstack/react-query';
import { basic } from '@/query/option';

export const useInexpensiveValueQuery = () =>
  useQuery({
    queryKey: ['useInexpensiveValue'],
    queryFn: () => fetchToss.fetchInexpensiveValue(),
    ...basic,
  });

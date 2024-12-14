import { fetchToss } from '@/fetch/fetchToss';
import { useQuery } from '@tanstack/react-query';
import { basic } from '@/query/option';

export const useStableGrowthQuery = () =>
  useQuery({
    queryKey: ['useStableGrowth'],
    queryFn: () => fetchToss.fetchStableGrowth(),
    ...basic,
  });

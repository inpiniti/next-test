import { fetchToss } from '@/fetch/fetchToss';
import { useQuery } from '@tanstack/react-query';
import { basic } from '@/query/option';

export const useUndervaluedGrowthQuery = () =>
  useQuery({
    queryKey: ['useUndervaluedGrowth'],
    queryFn: () => fetchToss.fetchUndervaluedGrowth(),
    ...basic,
  });

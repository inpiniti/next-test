import { fetchToss } from '@/fetch/fetchToss';
import { useQuery } from '@tanstack/react-query';
import { basic } from '@/query/option';

export const useGrowthExpectationQuery = () =>
  useQuery({
    queryKey: ['useGrowthExpectation'],
    queryFn: () => fetchToss.fetchGrowthExpectation(),
    ...basic,
  });

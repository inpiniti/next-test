import { fetchToss } from '@/fetch/fetchToss';
import { useQuery } from '@tanstack/react-query';
import { basic } from '@/query/option';

export const useEscapingUndervaluedQuery = () =>
  useQuery({
    queryKey: ['useEscapingUndervalued'],
    queryFn: () => fetchToss.fetchEscapingUndervalued(),
    ...basic,
  });

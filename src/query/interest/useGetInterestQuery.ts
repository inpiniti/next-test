import { fetchInterest } from '@/fetch/fetchInterest';
import { useQuery } from '@tanstack/react-query';
import { basic } from '@/query/option';

export const useGetInterestQuery = (id: string) =>
  useQuery({
    queryKey: ['getInterest', id],
    queryFn: () => fetchInterest.get(id!),
    ...basic,
    enabled: !!id,
  });

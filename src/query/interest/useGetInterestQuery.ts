import { fetchInterest } from '@/fetch/fetchInterest';
import { useQuery } from '@tanstack/react-query';

export const useGetInterestQuery = (id: string) =>
  useQuery({
    queryKey: ['getInterest', id],
    queryFn: () => fetchInterest.get(id!),
    enabled: !!id,
  });

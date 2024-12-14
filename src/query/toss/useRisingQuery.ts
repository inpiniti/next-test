import { fetchToss } from '@/fetch/fetchToss';
import { useQuery } from '@tanstack/react-query';
import { basic } from '@/query/option';

export const useRisingQuery = () =>
  useQuery({
    queryKey: ['useRising'],
    queryFn: () => fetchToss.fetchRising(),
    ...basic,
  });

import { useQuery } from '@tanstack/react-query';
import { fetchBuy } from '@/fetch/fetchBuy';
import { basic } from '@/query/option';

export const useGetBuyQuery = (id: string) =>
  useQuery({
    queryKey: ['getBuy', id],
    queryFn: () => fetchBuy.get(id!),
    ...basic,
    enabled: !!id,
  });

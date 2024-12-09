import { useQuery } from '@tanstack/react-query';
import { fetchBuy } from '@/fetch/fetchBuy';

export const useGetBuyQuery = (id: string) =>
  useQuery({
    queryKey: ['getBuy', id],
    queryFn: () => fetchBuy.get(id!),
    enabled: !!id,
  });

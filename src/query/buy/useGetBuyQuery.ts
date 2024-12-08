import { useQuery } from '@tanstack/react-query';
import { fetchBuy } from '@/fetch/fetchBuy';
import { TBuy } from '@/interface/TBuy';

export const useGetBuyQuery = (buy: TBuy) =>
  useQuery({
    queryKey: ['getBuy'],
    queryFn: () => fetchBuy.get(buy),
  });

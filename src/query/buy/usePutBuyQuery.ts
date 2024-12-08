import { fetchBuy } from '@/fetch/fetchBuy';
import { TBuy } from '@/interface/TBuy';
import { useMutation } from '@tanstack/react-query';

export const usePutBuyQuery = (buy: TBuy) =>
  useMutation({
    mutationFn: () => fetchBuy.put(buy),
  });

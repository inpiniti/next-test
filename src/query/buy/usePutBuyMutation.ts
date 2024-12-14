import { fetchBuy } from '@/fetch/fetchBuy';
import { TBuy } from '@/interface/TBuy';
import { useMutation } from '@tanstack/react-query';

export const usePutBuyMutation = () =>
  useMutation({
    mutationFn: (buy: TBuy) => fetchBuy.put(buy),
  });

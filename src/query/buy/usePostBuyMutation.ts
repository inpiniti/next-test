import { fetchBuy } from '@/fetch/fetchBuy';
import { TBuy } from '@/interface/TBuy';
import { useMutation } from '@tanstack/react-query';

export const usePostBuyMutation = () =>
  useMutation({
    mutationFn: (buy: TBuy) => fetchBuy.post(buy),
  });

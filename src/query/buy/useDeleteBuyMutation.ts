import { fetchBuy } from '@/fetch/fetchBuy';
import { TBuy } from '@/interface/TBuy';
import { useMutation } from '@tanstack/react-query';

export const useDeleteBuyMutation = () =>
  useMutation({
    mutationFn: (buy: TBuy) => fetchBuy.delete(buy),
  });

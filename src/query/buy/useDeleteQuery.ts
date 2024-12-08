import { fetchBuy } from '@/fetch/fetchBuy';
import { TBuy } from '@/interface/TBuy';
import { useMutation } from '@tanstack/react-query';

export const useDeleteQuery = (buy: TBuy) =>
  useMutation({
    mutationFn: () => fetchBuy.delete(buy),
  });

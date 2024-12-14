import { fetchSales } from '@/fetch/fetchSales';
import { TSales } from '@/interface/TSales';
import { useMutation } from '@tanstack/react-query';

export const usePostSalesMutation = () =>
  useMutation({
    mutationFn: (sales: TSales) => fetchSales.post(sales),
  });

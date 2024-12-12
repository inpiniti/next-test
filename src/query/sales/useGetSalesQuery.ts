import { useQuery } from '@tanstack/react-query';
import { fetchSales } from '@/fetch/fetchSales';

export const useGetSalesQuery = (id: string) =>
  useQuery({
    queryKey: ['getSales', id],
    queryFn: () => fetchSales.get(id!),
    enabled: !!id,
  });

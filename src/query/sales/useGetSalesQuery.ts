import { useQuery } from '@tanstack/react-query';
import { fetchSales } from '@/fetch/fetchSales';
import { basic } from '@/query/option';

export const useGetSalesQuery = (id: string) =>
  useQuery({
    queryKey: ['getSales', id],
    queryFn: () => fetchSales.get(id!),
    ...basic,
    enabled: !!id,
  });

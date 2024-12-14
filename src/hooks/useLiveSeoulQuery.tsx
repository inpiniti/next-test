import { useQuery } from '@tanstack/react-query';
import { fetchLiveSeoul } from '@/fetch/fetchLiveSeoul';

const useLiveSeoulQuery = () =>
  useQuery({
    queryKey: ['useLiveSeoul'],
    queryFn: async () => {
      const data = await fetchLiveSeoul();
      if (Array.isArray(data) && data.length === 0) {
        throw new Error('Empty data');
      }
      return data;
    },
    refetchInterval: 60000, // 1분마다 패칭
    retry: true, // 실패 시 재시도
  });

export default useLiveSeoulQuery;

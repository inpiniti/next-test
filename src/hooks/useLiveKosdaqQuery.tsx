import { useQuery } from '@tanstack/react-query';
import { fetchLiveKosdaq } from '@/fetch/fetchLiveKosdaq';

const useLiveKosdaqQuery = () =>
  useQuery({
    queryKey: ['useLiveKosdaq'],
    queryFn: async () => {
      const data = await fetchLiveKosdaq();
      if (Array.isArray(data) && data.length === 0) {
        throw new Error('Empty data');
      }
      return data;
    },
    refetchInterval: 60000, // 1분마다 패칭
  });

export default useLiveKosdaqQuery;

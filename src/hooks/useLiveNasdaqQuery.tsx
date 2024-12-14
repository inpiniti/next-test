import { useQuery } from '@tanstack/react-query';
import { fetchLiveNasdaq } from '@/fetch/fetchLiveNasdaq';

const useLiveNasdaqQuery = () =>
  useQuery({
    queryKey: ['useLiveNasdaq'],
    queryFn: async () => {
      const data = await fetchLiveNasdaq();
      if (Array.isArray(data) && data.length === 0) {
        throw new Error('Empty data');
      }
      return data;
    },
    refetchInterval: 60000, // 1분마다 패칭
  });

export default useLiveNasdaqQuery;

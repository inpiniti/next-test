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
    retry: false, // 실패 시 재시도
    enabled: false,
  });

export default useLiveKosdaqQuery;

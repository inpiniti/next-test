import { useQuery } from '@tanstack/react-query';
import { getData } from '../services/data'; // 서비스에서 데이터 호출

export const useTest = () => {
    return useQuery({
        queryKey: ['test'],
        queryFn: getData,
        //enabled: !!userId,  // userId가 있을 때만 쿼리 실행
        staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 fresh 상태로 유지
        //refetchInterval: 1000 * 60 * 1,  // 1분마다 자동으로 리페치
      })
};
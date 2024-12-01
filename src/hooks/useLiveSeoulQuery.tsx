import { useQuery } from '@tanstack/react-query';
import { fetchLiveSeoul } from '@/fetch/fetchLiveSeoul';
import useLiveMarketStore from '@/stores/useLiveMarketStore';
import { useEffect, useState } from 'react';
import IStock from '@/interface/IStock';
import useFilterStore from '@/stores/useFilterStore';

const useLiveSeoulQuery = () => {
  const { filter } = useFilterStore();
  const setMarketList = useLiveMarketStore((state) => state.setMarketList);
  const [isFetchingEnabled, setIsFetchingEnabled] = useState(false);

  const query = useQuery({
    queryKey: ['useLiveSeoul'],
    queryFn: fetchLiveSeoul,
    refetchInterval: 60000, // 1분마다 패칭
    enabled: isFetchingEnabled, // 패칭 활성화/비활성화
  });

  useEffect(() => {
    if (query.data && filter.market === 'seoul') {
      const updatedData = query.data.map((stock: IStock) => {
        const chartData = Array.from({ length: 23 }, (_, index) => {
          const hour = index + 1;
          const key = `full_model_${hour}h_prediction` as keyof IStock;
          const changeValue = Number(stock[key]);
          return {
            name: `${hour}h`,
            key: key,
            change: parseFloat((changeValue * 100).toFixed(2)),
          };
        });

        // change 값의 최대값, 최소값, 평균값 계산
        const changes = chartData.map((data) => data.change);
        const maxChange = Math.max(...changes).toFixed(2);
        const minChange = Math.min(...changes).toFixed(2);
        const avgChange = (
          changes.reduce((sum, value) => sum + value, 0) / changes.length
        ).toFixed(2);

        return {
          ...stock,
          chartData: chartData,
          maxChange: maxChange,
          minChange: minChange,
          avgChange: avgChange,
        };
      });

      setMarketList(updatedData);
    }
  }, [query.data, setMarketList, filter.market]);

  const toggleFetching = (arg: boolean) => {
    setIsFetchingEnabled(arg);
  };

  return { query, toggleFetching };
};

export default useLiveSeoulQuery;

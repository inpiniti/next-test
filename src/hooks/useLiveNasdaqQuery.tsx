import { useQuery } from "@tanstack/react-query";
import { fetchLiveNasdaq } from "@/fetch/fetchLiveNasdaq";
import useLiveNasdaqStore from "@/stores/useLiveNasdaqStore";
import { useEffect } from "react";
import IStock from "@/interface/IStock";

const useLiveNasdaqQuery = () => {
  const setLiveNasdaqList = useLiveNasdaqStore(
    (state) => state.setLiveNasdaqList
  );

  const query = useQuery({
    queryKey: ["useLiveNasdaq"],
    queryFn: fetchLiveNasdaq,
    refetchInterval: 60000, // 1분마다 패칭
  });

  useEffect(() => {
    if (query.data) {
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

      setLiveNasdaqList(updatedData);
    }
  }, [query.data, setLiveNasdaqList]);

  return query;
};

export default useLiveNasdaqQuery;

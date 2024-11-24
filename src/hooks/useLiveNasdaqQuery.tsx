import { useQuery } from "@tanstack/react-query";
import { fetchLiveNasdaq } from "@/fetch/fetchLiveNasdaq";
import useLiveNasdaqStore from "@/stores/useLiveNasdaqStore";
import IStock from "@/interface/IStock";
import { useEffect } from "react";

const useLiveNasdaqQuery = () => {
  const setLiveNasdaqList = useLiveNasdaqStore(
    (state) => state.setLiveNasdaqList
  );

  const query = useQuery<IStock, Error, IStock[]>({
    queryKey: ["useLiveNasdaq"],
    queryFn: fetchLiveNasdaq,
    refetchInterval: 60000, // 1분마다 패칭
  });

  useEffect(() => {
    if (query.data) {
      setLiveNasdaqList(query.data);
    }
  }, [query.data, setLiveNasdaqList]);

  return query;
};

export default useLiveNasdaqQuery;

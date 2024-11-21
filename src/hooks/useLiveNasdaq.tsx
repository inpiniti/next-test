import { useQuery } from "@tanstack/react-query";
import { fetchLiveNasdaq } from "@/fetch/fetchLiveNasdaq";

const useLiveNasdaq = () => {
  const query = useQuery({
    queryKey: ["useLiveNasdaq"],
    queryFn: fetchLiveNasdaq,
  });

  return query;
};

export default useLiveNasdaq;

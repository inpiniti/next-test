import { create } from "zustand";
import { devtools } from "zustand/middleware";
import IStock from "@/interface/IStock";

interface LiveNasdaqStore {
  liveNasdaqName: string | null;
  liveNasdaqList: IStock[];
  setLiveNasdaqId: (name: string) => void;
  setLiveNasdaqList: (data: IStock[]) => void;
  getLiveNasdaq: () => IStock | undefined;
}

const useLiveNasdaqStore = create<LiveNasdaqStore>()(
  devtools((set, get) => ({
    liveNasdaqName: null,
    liveNasdaqList: [],
    setLiveNasdaqId: (name: string) => set({ liveNasdaqName: name }),
    setLiveNasdaqList: (data: IStock[]) => set({ liveNasdaqList: data }),
    getLiveNasdaq: () => {
      const { liveNasdaqName, liveNasdaqList } = get();
      return liveNasdaqList.find(
        (item: IStock) => item.name === liveNasdaqName
      );
    },
  }))
);

export default useLiveNasdaqStore;

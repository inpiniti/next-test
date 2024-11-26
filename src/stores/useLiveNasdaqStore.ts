import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import IStock from "@/interface/IStock";

interface LiveNasdaqStore {
  liveNasdaqName: string | null;
  liveNasdaqList: IStock[];
  setLiveNasdaqId: (name: string) => void;
  setLiveNasdaqList: (data: IStock[]) => void;
  getLiveNasdaq: () => IStock | undefined;
}

const useLiveNasdaqStore = create<LiveNasdaqStore>()(
  devtools(
    persist(
      (set, get) => ({
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
      }),
      {
        name: "live-nasdaq-storage", // 로컬 스토리지에 저장될 키 이름
      }
    )
  )
);

export default useLiveNasdaqStore;

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import IStock from '@/interface/IStock';

interface LiveMarketStore {
  marketName: string | null;
  marketList: IStock[];
  setMarketId: (name: string) => void;
  setMarketList: (data: IStock[]) => void;
  getMarket: () => IStock | undefined;
}

const useLiveMarketStore = create<LiveMarketStore>()(
  devtools(
    (set, get) => ({
      marketName: null,
      marketList: [],
      setMarketId: (name: string) => set({ marketName: name }),
      setMarketList: (data: IStock[]) => set({ marketList: data }),
      getMarket: () => {
        const { marketName, marketList } = get();
        return marketList.find((item: IStock) => item.name === marketName);
      },
    }),
    {
      name: 'LiveMarketStore',
    }
  )
);

export default useLiveMarketStore;

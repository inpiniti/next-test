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
      setMarketList: (data: IStock[]) => {
        const updatedData = data.map((stock: IStock) => {
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
          const maxChange = parseFloat(Math.max(...changes).toFixed(2));
          const minChange = parseFloat(Math.min(...changes).toFixed(2));
          const avgChange = parseFloat(
            (
              changes.reduce((sum, value) => sum + value, 0) / changes.length
            ).toFixed(2)
          );

          return {
            ...stock,
            chartData: chartData,
            maxChange: maxChange,
            minChange: minChange,
            avgChange: avgChange,
          };
        });

        set({ marketList: updatedData });
      },
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

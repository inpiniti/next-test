import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface IFilter {
  stock: string;
  sector: string;
  minVolume: number;
  minGrowthRate: number;
  avgGrowthRate: number;
  displayItemCount: number;
}

interface FilterStore {
  filter: IFilter;
  setFilter: (filter: IFilter) => void;
}

const useFilterStore = create<FilterStore>()(
  devtools(
    persist(
      (set) => ({
        filter: {
          stock: "",
          sector: "",
          minVolume: 1000000,
          minGrowthRate: 30,
          avgGrowthRate: 50,
          displayItemCount: 100,
        },
        setFilter: (filter: IFilter) => set({ filter }),
      }),
      {
        name: "filter-storage", // 로컬 스토리지에 저장될 키 이름
      }
    )
  )
);

export default useFilterStore;

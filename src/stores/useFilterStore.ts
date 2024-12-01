import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface IFilter {
  market: string;
  stock: string;
  sector: string;
  minVolume: number;
  minGrowthRate: number;
  avgGrowthRate: number;
  displayItemCount: number;
  sortConfig: string;
  isDialogOpen: boolean;
}

interface FilterStore {
  filter: IFilter;
  setFilter: (filter: IFilter) => void;
}

const useFilterStore = create<FilterStore>()(
  devtools((set) => ({
    filter: {
      market: 'seoul',
      stock: '',
      sector: '',
      minVolume: 10000,
      minGrowthRate: 10,
      avgGrowthRate: 50,
      displayItemCount: 100,
      sortConfig: 'full_model_1h_prediction',
      isDialogOpen: false,
    },
    setFilter: (filter: IFilter) => set({ filter }),
  }))
);

export default useFilterStore;

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useAuthStore = create(
  devtools(
    (set) => ({
      user: {},
      setUser: (data) => {
        set(
          (state) => {
            state.user = data;
          },
          false,
          'setRecommendApp'
        );
      },
    }),
    { name: 'MeterReadingStore' }
  )
);

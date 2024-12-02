import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
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
      {
        name: 'auth-storage', // 로컬 스토리지에 저장될 키 이름
        getStorage: () => localStorage, // 로컬 스토리지를 사용
      }
    ),
    { name: 'useAuthStore' }
  )
);

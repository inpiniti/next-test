import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface PostState {
  postId: number;
  incrementPostId: () => void;
  setPostId: (id: number) => void;
}

const usePostStore = create<PostState>()(
  devtools((set) => ({
    postId: 9001,
    incrementPostId: () => set((state) => ({ postId: state.postId + 1 })),
    setPostId: (id: number) => set({ postId: id }),
  }))
);

export default usePostStore;

import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface PostData {
  by: string;
  text: string;
  time: number;
  title: string;
  url: string;
}

interface PostState {
  postId: number;
  postData: PostData | null;
  fetchPostData: () => Promise<void>;
  incrementPostId: () => void;
}

const usePostStore = create<PostState>()(
  devtools((set, get) => ({
    postId: 9001,
    postData: null,
    fetchPostData: async () => {
      const { postId } = get();
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${postId}.json`
      );
      const data: PostData = await response.json();
      set({ postData: data });
    },
    incrementPostId: () => set((state) => ({ postId: state.postId + 1 })),
  }))
);

export default usePostStore;

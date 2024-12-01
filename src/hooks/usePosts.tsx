import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const fetchPost = async (postId: number) => {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${postId}.json`
  );
  if (!response.ok) {
    throw new Error('네트워크 응답이 올바르지 않습니다.');
  }
  const data = await response.json();
  return data;
};

const usePost = (postId: number) => {
  const query = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPost(postId),
  });

  useEffect(() => {
    query.refetch();
  }, [postId, query]);

  return query;
};

export default usePost;

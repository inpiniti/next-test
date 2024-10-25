import React from "react";
import usePosts from "@/hooks/usePosts";

const ExampleComponent = () => {
  const { data, error, isLoading, refetch } = usePosts();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div>
      <h1>포스트 목록</h1>
      <button onClick={() => refetch()}>다시 불러오기</button>
      <ul>
        {data.map((post: { id: number; title: string }) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExampleComponent;

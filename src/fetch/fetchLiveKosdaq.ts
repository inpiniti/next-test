export const fetchLiveKosdaq = async () => {
  const response = await fetch(`api/live/kosdaq`);
  if (!response.ok) {
    throw new Error('네트워크 응답이 올바르지 않습니다.');
  }
  const data = await response.json();
  return data;
};

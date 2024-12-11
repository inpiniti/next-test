export const fetchStockCodeToSymbol = async (stockCode: string) => {
  const response = await fetch(
    `https://wts-info-api.tossinvest.com/api/v2/stock-infos/${stockCode}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("네트워크 응답이 올바르지 않습니다.");
  }
  const data = await response.json();
  return data?.result?.symbol;
};

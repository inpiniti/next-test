import { fetchStockCodeToSymbol } from './fetchStockCodeToSymbol';
import { insert, select } from './table';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const fetchToss = async ({
  filters,
  sort,
}: {
  filters: any[];
  sort: any;
}) => {
  const response = await fetch(
    `https://wts-cert-api.tossinvest.com/api/v2/screener/screen`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pagingParam: {
          key: null,
          number: 1,
          size: 50,
        },
        filters: [
          {
            id: '시장',
            conditions: [
              {
                id: '시장_선택',
                type: 'STRING',
                value: 'NSQ',
              },
            ],
          },
          ...filters,
        ],
        sort,
        nation: 'us',
      }),
    }
  );
  if (!response.ok) {
    throw new Error('네트워크 응답이 올바르지 않습니다.');
  }
  const data = await response.json();
  const stockCodeList = data.result.stocks.map((stock: any) => stock.stockCode);

  console.log('select');
  const tossTableList = await select();
  // tossTableList = [{ stockCode: 'NAS0230301005', symbol: 'ACAD' }, ...]
  const symbolList = [];

  for (let i = 0; i < stockCodeList.length; i++) {
    const stockCode = stockCodeList[i];
    const symbol = tossTableList.find(
      (item: any) => item.stockCode === stockCode
    )?.symbol;

    console.log(i);

    if (symbol) {
      symbolList.push(symbol);
    } else {
      console.log('fetchStockCodeToSymbol');
      const symbol = await fetchStockCodeToSymbol(stockCode);
      console.log('insert');
      await insert({ stockCode, symbol });
      symbolList.push(symbol);
    }
  }

  return symbolList;
};

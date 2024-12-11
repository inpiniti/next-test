'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TBuy } from '@/interface/TBuy';
import { useGetBuyQuery } from '@/query/buy/useGetBuyQuery';
import { useAuthStore } from '@/stores/useAuthStore';
import { useEffect, useMemo, useState } from 'react';
import useLiveMarketStore from '@/stores/useLiveMarketStore';
import IStock from '@/interface/IStock';
import useFilterStore from '@/stores/useFilterStore';
import { ComponentName } from '@/components/ComponentName';

export const LayoutASidebar = () => {
  const [live] = useState({
    logoid: 'samsung',
    description: '삼성전자보통주',
  });

  // 유저 정보
  const { user } = useAuthStore();

  // 쿼리
  const { data, refetch, isLoading, isError } = useGetBuyQuery(user?.id);
  const { marketList, setMarketId } = useLiveMarketStore();
  const { filter, setFilter } = useFilterStore();

  const marketListFilter = useMemo(() => {
    const filter = marketList
      ?.filter((marketItem: IStock) =>
        data?.some((buyItem: TBuy) => marketItem.name === buyItem.name)
      )
      .map((marketItem: IStock) => {
        const buyItem = data.find(
          (buyItem: TBuy) => marketItem.name === buyItem.name
        );
        return {
          ...marketItem,
          buyData: buyItem,
        };
      });

    return filter;
  }, [marketList, data]);

  // 카드 클릭
  const cardClick = (item: IStock) => {
    setMarketId(item.name);
    setFilter({ ...filter, isDialogOpen: true });
  };

  useEffect(() => {
    if (user?.id) {
      refetch();
    }
  }, [refetch, user?.id]);

  return (
    <aside className="flex flex-col h-full overflow-hidden divide-y min-w-[376px] relative">
      <ComponentName name="<LayoutASidebar>" />
      <Tabs defaultValue="account" className="shrink-0 p-2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account" onClick={() => refetch()}>
            구매목록
          </TabsTrigger>
          <TabsTrigger value="password">관심종목</TabsTrigger>
        </TabsList>
      </Tabs>
      <ScrollArea className="h-full">
        <div className="gap-2 flex flex-col p-2">
          {!user?.id && <div>로그인이 필요합니다.</div>}
          {isLoading && <div>Loading...</div>}
          {isError && <div>데이터를 불러오는 중 오류가 발생했습니다.</div>}
          {data && data.length === 0 && <div>구매 목록이 없습니다.</div>}
          {data &&
            data.length > 0 &&
            marketListFilter.map((item: IStock, index: number) => (
              <Card
                key={index}
                className="w-[360px] p-2 flex flex-col gap-1 cursor-pointer hover:bg-neutral-50"
                onClick={() => cardClick(item)}
              >
                <div className="flex gap-2 justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <div>
                        <Avatar className="border">
                          <AvatarImage
                            src={`https://s3-symbol-logo.tradingview.com/${item.logoid}--big.svg`}
                            alt="@radix-vue"
                          />
                          <AvatarFallback>
                            {live.description.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex justify-between gap-2">
                      <div>
                        <div className="text-xs text-neutral-400">최소</div>
                        <div className="text-sm">
                          {Number(item.minChange).toFixed(2)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-400">1시간후</div>
                        <div className="text-sm">
                          {Number(item.full_model_1h_prediction).toFixed(2)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-400">평균</div>
                        <div className="text-sm">
                          {Number(item.avgChange).toFixed(2)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-400">최대</div>
                        <div className="text-sm">
                          {Number(item.maxChange).toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5 items-start w-24">
                    <div className="whitespace-nowrap overflow-hidden text-ellipsis flex flex-col">
                      <span className="text-xs text-neutral-400">현재가</span>
                      <div className="flex items-center gap-1">
                        <p>{item.close}</p>
                        <span className="text-xs">
                          ({Number(item.change).toFixed(2)})
                        </span>
                      </div>
                    </div>
                    <div className="whitespace-nowrap overflow-hidden text-ellipsis flex flex-col">
                      <span className="text-xs text-neutral-400">구매가</span>
                      <div className="flex items-center gap-1">
                        <p>{item?.buyData?.price}</p>
                        <span className="text-xs">
                          (
                          {(
                            ((Number(item?.buyData?.price) -
                              Number(item?.close)) /
                              Number(item?.buyData?.price)) *
                            100
                          ).toFixed(2)}
                          )
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </ScrollArea>
    </aside>
  );
};

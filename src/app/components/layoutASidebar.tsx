import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchBuy } from '@/fetch/fetchBuy';
import { TBuy } from '@/interface/TBuy';
import { useGetBuyQuery } from '@/query/buy/useGetBuyQuery';
import { useAuthStore } from '@/stores/useAuthStore';
import { useEffect, useState } from 'react';

export const LayoutASidebar = () => {
  const [live] = useState({
    logoid: 'samsung',
    description: '삼성전자보통주',
  });

  // 유저 정보
  const { user } = useAuthStore();

  // 쿼리
  const { data, refetch } = useGetBuyQuery({
    id: user?.id,
  });

  useEffect(() => {
    console.log(1);
    refetch();
    console.log(2);

    fetchBuy.get({ id: user?.id });
  }, [refetch, user?.id]);

  return (
    <aside className="flex flex-col h-full overflow-hidden divide-y">
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
          data : {JSON.stringify(data)} : data
          {data?.map((item: TBuy, index: number) => (
            <Card key={index} className="w-[360px] p-2 flex flex-col gap-1">
              <div className="flex gap-2 justify-between items-center">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <div>
                      <Avatar className="border">
                        <AvatarImage
                          src={`https://s3-symbol-logo.tradingview.com/${live.logoid}--big.svg`}
                          alt="@radix-vue"
                        />
                        <AvatarFallback>
                          {live.description.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <CardTitle>002810 ({item?.key})</CardTitle>
                      <CardDescription>삼영무역보통주</CardDescription>
                    </div>
                  </div>
                  <div className="flex justify-between gap-2">
                    <div>
                      <div className="text-xs text-neutral-400">최소</div>
                      <div className="text-sm">30.22%</div>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-400">1시간후</div>
                      <div className="text-sm">41.73%</div>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-400">평균</div>
                      <div className="text-sm">60.17%</div>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-400">최대</div>
                      <div className="text-sm">95.93%</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5 items-end">
                  <p className="whitespace-nowrap overflow-hidden text-ellipsis flex flex-col">
                    <span className="text-xs text-neutral-400">현재가</span>
                    <div className="flex items-center gap-1">
                      <p>12,820원</p>
                      <span className="text-xs">(-4.26%)</span>
                    </div>
                  </p>
                  <p className="whitespace-nowrap overflow-hidden text-ellipsis flex flex-col">
                    <span className="text-xs text-neutral-400">구매가</span>
                    <div className="flex items-center gap-1">
                      <p>12,820원</p>
                      <span className="text-xs">(-4.26%)</span>
                    </div>
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
};

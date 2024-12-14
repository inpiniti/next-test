'use client';

import { useEffect, useMemo } from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComponentName } from '@/components/ComponentName';

import { TBuy } from '@/interface/TBuy';
import IStock from '@/interface/IStock';

import { useAuthStore } from '@/stores/useAuthStore';
import useFilterStore from '@/stores/useFilterStore';
import useLiveMarketStore from '@/stores/useLiveMarketStore';

import { useGetBuyQuery } from '@/query/buy/useGetBuyQuery';
import { useGetSalesQuery } from '@/query/sales/useGetSalesQuery';
import { useGetInterestQuery } from '@/query/interest/useGetInterestQuery';
import { LayoutASidebarCardBuy } from './layoutASidebarCardBuy';
import { LayoutASidebarCardInterest } from './layoutASidebarCardInterest';
import { LayoutASidebarCardSales } from './LayoutASidebarCardSales';
import { TSales } from '@/interface/TSales';

export const LayoutASidebar = () => {
  // store
  const { user } = useAuthStore(); // 유저 정보
  const { marketList } = useLiveMarketStore(); // 시장 정보
  const { filter, setFilter } = useFilterStore(); // 필터

  // query
  const buyQuery = useGetBuyQuery(user?.id);
  const salesQuery = useGetSalesQuery(user?.id);
  const interestQuery = useGetInterestQuery(user?.id);

  const marketListFilter = useMemo(() => {
    let query = [];

    switch (filter.tab) {
      case 'buy':
        query = buyQuery?.data || [];
        break;
      case 'sales':
        query = salesQuery?.data || [];
        break;
      case 'interest':
        query = interestQuery?.data || [];
        break;
    }

    const filterList = marketList
      ?.filter((marketItem: IStock) =>
        query?.some((buyItem: TBuy) => marketItem.name === buyItem.name)
      )
      .map((marketItem: IStock) => {
        const buyItem = query?.find(
          (buyItem: TBuy) => marketItem.name === buyItem.name
        );
        return {
          ...marketItem,
          buyData: buyItem,
        };
      });

    switch (filter.tab) {
      case 'buy':
        return filterList.map((marketItem: IStock) => {
          const buyItem = query?.find(
            (buyItem: TBuy) => marketItem.name === buyItem.name
          );
          return {
            ...marketItem,
            buyData: buyItem,
          };
        });
      case 'sales':
        return filterList.map((marketItem: IStock) => {
          const salesItem = query?.find(
            (salesItem: TSales) => marketItem.name === salesItem.name
          );
          return {
            ...marketItem,
            salesData: salesItem,
          };
        });
      case 'interest':
        return filterList.map((marketItem: IStock) => {
          const interestItem = query?.find(
            (interestItem: TBuy) => marketItem.name === interestItem.name
          );
          return {
            ...marketItem,
            interestData: interestItem,
          };
        });
    }

    return filterList;
  }, [filter.tab, salesQuery, buyQuery, interestQuery, marketList]);

  // 탭 변경
  const handleTabs = (value: string) => {
    setFilter({ ...filter, tab: value });
    // 목록도 변경되어야 함
  };

  useEffect(() => {
    if (user?.id) {
      buyQuery.refetch();
      salesQuery.refetch();
      interestQuery.refetch();
    }
  }, [user?.id]);

  return (
    <aside className="flex flex-col h-full overflow-hidden divide-y min-w-[376px] relative">
      <ComponentName name="<LayoutASidebar>" />
      <Tabs
        value={filter.tab}
        onValueChange={handleTabs}
        className="shrink-0 p-2"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="buy">구매목록</TabsTrigger>
          <TabsTrigger value="interest">관심종목</TabsTrigger>
          <TabsTrigger value="sales">판매목록</TabsTrigger>
        </TabsList>
      </Tabs>
      <ScrollArea className="h-full">
        <div className="gap-2 flex flex-col p-2">
          {!user?.id && <div>로그인이 필요합니다.</div>}
          {user?.id && buyQuery.isLoading && <div>Loading...</div>}
          {user?.id && buyQuery.isError && (
            <div>데이터를 불러오는 중 오류가 발생했습니다.</div>
          )}
          {user?.id && buyQuery.data && buyQuery.data.length === 0 && (
            <div>구매 목록이 없습니다.</div>
          )}
          {user?.id &&
            buyQuery.data &&
            buyQuery.data.length > 0 &&
            marketListFilter.map((item: IStock) =>
              filter.tab === 'buy' ? (
                <LayoutASidebarCardBuy key={item.name} item={item} />
              ) : filter.tab === 'interest' ? (
                <LayoutASidebarCardInterest key={item.name} item={item} />
              ) : (
                <LayoutASidebarCardSales key={item.name} item={item} />
              )
            )}
        </div>
      </ScrollArea>
    </aside>
  );
};

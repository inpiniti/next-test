import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';

import { TSales } from '@/interface/TSales';
import IStock from '@/interface/IStock';

import useFilterStore from '@/stores/useFilterStore';
import useLiveMarketStore from '@/stores/useLiveMarketStore';
import dayjs from 'dayjs';

type TStockSales = IStock & {
  salesData?: TSales;
};

export const LayoutASidebarCardSales = ({ item }: { item: TStockSales }) => {
  // store
  const { setMarketId } = useLiveMarketStore(); // 시장 정보
  const { filter, setFilter } = useFilterStore(); // 필터

  // 카드 클릭
  const cardClick = (item: TStockSales) => {
    setMarketId(item.name);
    setFilter({ ...filter, isDialogOpen: true });
  };
  return (
    <Card
      className="w-[360px] p-2 flex flex-col gap-1 cursor-pointer hover:bg-accent"
      onClick={() => cardClick(item)}
    >
      <div className="flex gap-2 justify-between ">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <div>
              <Avatar className="border">
                <AvatarImage
                  src={`https://s3-symbol-logo.tradingview.com/${item.logoid}--big.svg`}
                  alt="@radix-vue"
                />
                <AvatarFallback>
                  {item?.description?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-1.5 items-start">
          <p className="text-xs text-neutral-400">
            {dayjs(item?.salesData?.created_at?.toString()).format(
              'YYYY-MM-DD HH:mm:ss'
            )}
          </p>
          <p>
            {(Number(item?.salesData?.buy_price) -
              Number(item?.salesData?.sales_price)) *
              Number(item?.salesData?.number)}
          </p>
        </div>
      </div>
    </Card>
  );
};

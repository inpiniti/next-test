import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import IStock from '@/interface/IStock';
import useFilterStore from '@/stores/useFilterStore';
import useLiveMarketStore from '@/stores/useLiveMarketStore';

export const LayoutASidebarCardInterest = ({ item }: { item: IStock }) => {
  // store
  const { setMarketId } = useLiveMarketStore(); // 시장 정보
  const { filter, setFilter } = useFilterStore(); // 필터

  // 카드 클릭
  const cardClick = (item: IStock) => {
    setMarketId(item.name);
    setFilter({ ...filter, isDialogOpen: true });
  };
  return (
    <Card
      className="w-[360px] p-2 flex flex-col gap-1 cursor-pointer hover:bg-accent"
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
                  {item?.description?.slice(0, 2)}
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
        </div>
      </div>
    </Card>
  );
};

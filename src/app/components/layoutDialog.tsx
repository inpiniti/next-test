import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import IStock from '@/interface/IStock';
import useFilterStore from '@/stores/useFilterStore';
import useLiveMarketStore from '@/stores/useLiveMarketStore';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function LayoutDialog() {
  const { filter, setFilter } = useFilterStore();
  const { getMarket, marketName } = useLiveMarketStore();
  const [selectedStock, setSelectedStock] = useState<IStock | undefined>();

  const [value, setValue] = useState(0);

  useEffect(() => {
    setSelectedStock(getMarket());
  }, [getMarket, marketName]);

  const handleOpenChange = (isOpen: boolean) => {
    // alert dialog는 동작하지 않음
    // 일반 dialog로 변경 필요
    setFilter({ ...filter, isDialogOpen: isOpen });
  };

  return (
    <AlertDialog open={filter.isDialogOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="w-full">
        <AlertDialogHeader>
          <AlertDialogTitle>주문하기</AlertDialogTitle>
          <AlertDialogDescription>
            실제 주문이 아니라, 가상으로 구매한 주식을 기록하는 용도입니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center gap-2">
          <Avatar className="border">
            <AvatarImage
              src={`https://s3-symbol-logo.tradingview.com/${selectedStock?.logoid}--big.svg`}
              alt="@radix-vue"
            />
            <AvatarFallback>
              {selectedStock?.description?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-end gap-2">
              <div>{selectedStock?.description}</div>
              <div className="text-sm text-neutral-400">
                {selectedStock?.name}
              </div>
            </div>
            <div className="flex gap-2 items-end">
              <div className="text-lg font-bold">{selectedStock?.close}원</div>
              <div>어제보다</div>
              <div
                className={`${
                  Number(selectedStock?.change) > 0
                    ? 'text-red-500'
                    : 'text-blue-500'
                }`}
              >
                {Number(selectedStock?.change)?.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">구매가능금액</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">구매가격</Label>
              <Input
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
              />
            </div>
          </div>
        </form>
        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={() => setFilter({ ...filter, isDialogOpen: false })}
          >
            close
          </Button>
          <Button onClick={() => setFilter({ ...filter, isDialogOpen: false })}>
            save
          </Button>
        </AlertDialogFooter>
        {/* <DialogClose>Close</DialogClose> */}
      </AlertDialogContent>
    </AlertDialog>
  );
}

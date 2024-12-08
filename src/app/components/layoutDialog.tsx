import { Button } from '@/components/ui/button';
import IStock from '@/interface/IStock';
import useFilterStore from '@/stores/useFilterStore';
import useLiveMarketStore from '@/stores/useLiveMarketStore';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import NumberField from './NumberField';
import { usePostBuyMutation } from '@/query/buy/usePostBuyMutation';
import { useAuthStore } from '@/stores/useAuthStore';
import { DialogTitle } from '@radix-ui/react-dialog';

export default function LayoutDialog() {
  const { filter, setFilter } = useFilterStore();
  const { getMarket, marketName } = useLiveMarketStore();
  const [selectedStock, setSelectedStock] = useState<IStock>();

  // 뮤테이션
  const { isPending, mutate } = usePostBuyMutation();

  // 유저 정보
  const { user } = useAuthStore();

  useEffect(() => {
    setSelectedStock(getMarket());
  }, [getMarket, marketName]);

  const handleOpenChange = (isOpen: boolean) => {
    // alert dialog는 동작하지 않음
    // 일반 dialog로 변경 필요
    setFilter({ ...filter, isDialogOpen: isOpen });
  };

  // 구매수량
  const [number, setNumber] = useState(0);
  // 구매가격
  const [price, setPrice] = useState(0);

  // 구매하기
  const handleBuy = () => {
    if (selectedStock)
      mutate({
        id: user.id,
        name: selectedStock.name,
        number,
        price,
      });
  };

  return (
    <Dialog open={filter.isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-full">
        <DialogTitle>구매하기</DialogTitle> {/* DialogTitle 추가 */}
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
              <Label htmlFor="name">구매수량</Label>
              <NumberField
                className="bg-white"
                value={number}
                onChange={(e) => {
                  const newValue = Number(e);
                  const oldValue = number;

                  if (newValue == 0 && oldValue > 10) {
                    setNumber(oldValue * 0.9);
                  } else {
                    setNumber(Number(e));
                  }
                }}
                min={0}
                step={
                  number >= 1000000000
                    ? 1000000000
                    : number >= 100000000
                    ? 100000000
                    : number >= 10000000
                    ? 10000000
                    : number >= 1000000
                    ? 1000000
                    : number >= 100000
                    ? 100000
                    : number >= 10000
                    ? 10000
                    : number >= 1000
                    ? 1000
                    : number >= 100
                    ? 100
                    : number >= 10
                    ? 10
                    : 1
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">구매가격</Label>
              <Input
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setFilter({ ...filter, isDialogOpen: false })}
          >
            취소
          </Button>
          {user?.id ? (
            <Button onClick={handleBuy} disabled={isPending}>
              {isPending ? '구매중...' : '구매'}
            </Button>
          ) : (
            <Button onClick={handleBuy} disabled>
              로그인 필요
            </Button>
          )}
        </DialogFooter>
        {/* <DialogClose>Close</DialogClose> */}
      </DialogContent>
    </Dialog>
  );
}

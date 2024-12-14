import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { ComponentName } from '@/components/ComponentName';
import { DialogTitle } from '@radix-ui/react-dialog';
import { ShoppingCart, Star } from 'lucide-react';
import NumberField from './NumberField';

import { useEffect, useMemo, useState } from 'react';

import IStock from '@/interface/IStock';

import useFilterStore from '@/stores/useFilterStore';
import useLiveMarketStore from '@/stores/useLiveMarketStore';
import { useAuthStore } from '@/stores/useAuthStore';

import { useGetBuyQuery } from '@/query/buy/useGetBuyQuery';
import { usePostBuyMutation } from '@/query/buy/usePostBuyMutation';
import { useDeleteBuyMutation } from '@/query/buy/useDeleteBuyMutation';
import { usePutBuyMutation } from '@/query/buy/usePutBuyMutation';

import { usePostSalesMutation } from '@/query/sales/usePostSalesMutation';
import { useGetInterestQuery } from '@/query/interest/useGetInterestQuery';
import { usePostInterestMutation } from '@/query/interest/usePostInterestMutation';
import { useDeleteInterestMutation } from '@/query/interest/useDeleteInterestMutation';
import { TInterest } from '@/interface/TInterest';

export default function LayoutDialog() {
  // store
  const { filter, setFilter } = useFilterStore();
  const { getMarket, marketName } = useLiveMarketStore();
  const { user } = useAuthStore(); // 유저 정보

  // buy mutation
  const postBuyMutate = usePostBuyMutation();
  const deleteBuyMutation = useDeleteBuyMutation();
  const putBuyMutation = usePutBuyMutation();

  // sales mutation
  const postSalesMutate = usePostSalesMutation();

  // interest mutation
  const postInterestMutate = usePostInterestMutation();
  const deleteInterestMutate = useDeleteInterestMutation();

  // query
  const buyQuery = useGetBuyQuery(user?.id);
  const interestQuery = useGetInterestQuery(user?.id);

  // 선택한 종목
  const [selectedStock, setSelectedStock] = useState<IStock>();
  // 구매수량
  const [number, setNumber] = useState(0);
  // 구매가격
  const [price, setPrice] = useState(0);

  // 구매 종목에 있는지
  const isExist = useMemo(
    () =>
      buyQuery.data?.some(
        (buyItem: IStock) => buyItem.name === selectedStock?.name
      ),
    [buyQuery.data, selectedStock]
  );

  // 관심 종목에 있는지
  const isInterest = useMemo(
    () =>
      interestQuery.data?.some(
        (interestItem: IStock) => interestItem.name === selectedStock?.name
      ),
    [interestQuery.data, selectedStock]
  );

  // 구매 종목 정보
  const buyData = useMemo(
    () =>
      buyQuery.data?.find(
        (buyItem: IStock) => buyItem.name === selectedStock?.name
      ),
    [buyQuery.data, selectedStock]
  );

  // 리스트에서 stock 선택 시
  useEffect(() => {
    setSelectedStock(getMarket());
  }, [getMarket, marketName]);

  // 다이아로그 자동으로 닫기 시
  const handleOpenChange = (isOpen: boolean) => {
    // alert dialog는 동작하지 않음
    // 일반 dialog로 변경 필요
    setFilter({ ...filter, isDialogOpen: isOpen });
  };

  // 별표 클릭시
  const handleStarClick = () => {
    if (selectedStock) {
      if (isInterest) {
        // 관심종목 제거
        const selectedInterest = interestQuery.data.find(
          (interestItem: TInterest) => interestItem.name === selectedStock.name
        );
        deleteInterestMutate.mutate(selectedInterest, {
          onSuccess: () => {
            interestQuery.refetch();
          },
        });
      } else {
        // 관심종목 추가
        postInterestMutate.mutate(
          {
            id: user.id,
            name: selectedStock.name,
          },
          {
            onSuccess: () => {
              interestQuery.refetch();
            },
          }
        );
      }
    }
  };

  // 구매하기
  const handleBuy = () => {
    if (selectedStock)
      postBuyMutate.mutate(
        {
          id: user.id,
          name: selectedStock.name,
          number,
          price,
        },
        {
          onSuccess: () => {
            filter.isDialogOpen = false;
            buyQuery.refetch();
          },
        }
      );
  };

  // 제거하기
  const handleDeleteBuy = async () => {
    if (selectedStock)
      await deleteBuyMutation.mutate(
        {
          key: buyData.key,
        },
        {
          onSuccess: () => {
            filter.isDialogOpen = false;
            buyQuery.refetch();
          },
        }
      );
  };

  // 판매하기
  const handleSeles = () => {
    // sales 추가
    postSalesMutate.mutate(
      {
        id: user.id,
        name: buyData.name,
        number: number,
        buy_price: buyData.price,
        sales_price: price,
      },
      {
        onSuccess: async () => {
          await handleDeleteBuy();
          buyQuery.refetch();
        },
      }
    );
  };

  // 수정하기
  const handlePutBuy = () => {
    if (selectedStock)
      putBuyMutation.mutate(
        {
          key: buyData.key,
          id: user.id,
          name: selectedStock.name,
          number,
          price,
        },
        {
          onSuccess: () => {
            filter.isDialogOpen = false;
            buyQuery.refetch();
          },
        }
      );
  };

  // 수량 및 가격 변경
  useEffect(() => {
    // 선택한 종목이 구매한 종목인지 아닌지에 따라서 데이터가 세팅되어야 하는 부분이라 어쩔수 없이 useEffect 사용
    if (isExist) {
      setNumber(buyData.number);
      setPrice(buyData.price);
    } else {
      setNumber(0);
      setPrice(0);
    }
  }, [isExist, buyData]);

  return (
    <Dialog open={filter.isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-full">
        <ComponentName name="<layoutDialog>" />
        <DialogTitle className="flex justify-between font-bold">
          {isExist ? '변경하기' : '구매하기'}
          <div className="absolute top-5 right-9 flex gap-2">
            <div className="text-yellow-500 flex flex-col items-center gap-1">
              <Star
                className={`text-yellow-400 cursor-pointer ${
                  isInterest && `fill-current`
                }`}
                onClick={handleStarClick}
              />
            </div>
            <div className="text-blue-500 flex flex-col items-center gap-1">
              <ShoppingCart />
              <p className="text-xs">{buyData?.number || 0}</p>
            </div>
          </div>
          {/* <Star className="w-5 h-5 fill-current" /> */}
        </DialogTitle>

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
              <Label htmlFor="name">{isExist ? '보유수량' : '구매수량'}</Label>
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
              <Label htmlFor="framework">
                {isExist ? '평단가' : '구매가격'}
              </Label>
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
          {user?.id && isExist ? (
            <>
              <Button variant="destructive" onClick={handleDeleteBuy}>
                구매에서 제거
              </Button>
              <Button variant="default" onClick={handleSeles}>
                판매
              </Button>
              <Button onClick={handlePutBuy}>수량 및 가격 수정</Button>
            </>
          ) : user?.id && !isExist ? (
            <Button onClick={handleBuy} disabled={postBuyMutate.isPending}>
              {postBuyMutate.isPending ? '구매중...' : '구매'}
            </Button>
          ) : (
            <Button disabled>로그인 필요</Button>
          )}
        </DialogFooter>
        {/* <DialogClose>Close</DialogClose> */}
      </DialogContent>
    </Dialog>
  );
}

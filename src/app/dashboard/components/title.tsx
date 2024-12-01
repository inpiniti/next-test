'use client';

import useLiveNasdaqStore from '@/stores/useLiveMarketStore';

export function Title() {
  const market = useLiveNasdaqStore((state) => state.getMarket());
  return (
    <div className="flex gap-2 items-center">
      <div className="w-10 h-10 bg-red-700 rounded"></div>
      <div>
        <div className="flex gap-2">
          <div className="font-bold">SK하이닉스{market?.name}</div>
          <div className="text-neutral-400">000660</div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-2xl font-bold">201,000원</div>
          어제보다
          <div className="text-red-500">+5000원(2.5%)</div>
        </div>
      </div>
    </div>
  );
}

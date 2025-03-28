// FILE: app-sidebar-item.tsx
import React from 'react';
import IStock from '@/interface/IStock';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import useLiveNasdaqStore from '@/stores/useLiveMarketStore';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AppSidebarItem = ({ stock }: { stock: IStock }) => {
  const setMarketId = useLiveNasdaqStore((state) => state.setMarketId);
  const marketName = useLiveNasdaqStore((state) => state.marketName);
  const isActive = stock.name === marketName;

  const changeColor =
    stock.change && stock.change > 0 ? 'text-red-500' : 'text-blue-500';
  const formattedChange =
    stock.change !== undefined ? Number(stock.change).toFixed(2) : 'N/A';
  const relativeTime = formatDistanceToNow(new Date(stock.created_at), {
    addSuffix: true,
    locale: ko,
  });

  return (
    <a
      href="#"
      key={stock.name}
      className={`flex items-center p-4 gap-2 border-b ${
        isActive
          ? 'bg-black text-white hover:bg-black hover:text-white'
          : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
      }`}
      onClick={() => setMarketId(stock.name)}
    >
      <Avatar>
        <AvatarImage
          src={`https://s3-symbol-logo.tradingview.com/${stock.logoid}--big.svg`}
          alt="@radix-vue"
        />
        <AvatarFallback>{stock.description?.slice(0, 2)}</AvatarFallback>
      </Avatar>

      <div className="flex w-full flex-col items-start gap-2 whitespace-nowrap border-b text-sm leading-tight last:border-b-0">
        <div className="flex w-full items-center gap-2 justify-between">
          <span>{stock.name}</span>
          <span className="text-xs">{relativeTime}</span>
        </div>
        <div className="flex items-center">
          {stock.close !== undefined && (
            <p className="mr-2 font-bold text-xl">{stock.close}</p>
          )}
          (<p className={`${changeColor}`}>{formattedChange}%</p>)
        </div>
        <span className="flex gap-2 line-clamp-2 whitespace-break-spaces text-xs">
          <span className="ml-auto text-xs">{stock.sector_tr}</span>
          <span>|</span>
          <span>거래량 {Number(stock.volume_change).toFixed(2)}%</span>
        </span>
      </div>
    </a>
  );
};

export default AppSidebarItem;

// FILE: app-sidebar-item.tsx
import React from "react";
import IStock from "@/interface/IStock";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

const AppSidebarItem = ({ stock }: { stock: IStock }) => {
  const changeColor =
    stock.change && stock.change > 0 ? "text-red-500" : "text-blue-500";
  const formattedChange =
    stock.change !== undefined ? Number(stock.change).toFixed(2) : "N/A";
  const relativeTime = formatDistanceToNow(new Date(stock.created_at), {
    addSuffix: true,
    locale: ko,
  });

  return (
    <a
      href="#"
      key={stock.name}
      className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    >
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
    </a>
  );
};

export default AppSidebarItem;

"use client";

import * as React from "react";

import { CardHeader } from "@/components/ui/card";

export function Chart({ stock }) {
  return (
    <>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex">
          <button className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">최소</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {stock.minChange}%
            </span>
          </button>
          <button className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">평균</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {stock.avgChange}%
            </span>
          </button>
          <button className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">최대</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {stock.maxChange}%
            </span>
          </button>
        </div>
      </CardHeader>
      {stock.chartData.map((data, index) => (
        <div key={index}>{data.change}</div>
      ))}
    </>
  );
}

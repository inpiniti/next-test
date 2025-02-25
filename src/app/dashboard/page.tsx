'use client';

// import { Title } from "./components/title";
// import { AlertDialogDemo } from "./components/alert-dialog-demo";
// import { CardDemo } from "./components/card-demo";
// import { SheetDemo } from "./components/sheet-demo";
// import { PopoverDemo } from "./components/popover-demo";
// import { ToastDemo } from "./components/toast-demo";
// import { TypographyDemo } from "./components/typography-demo";
// import { Chart } from "./components/chart";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import IStock from '@/interface/IStock';
import useFilterStore from '@/stores/useFilterStore';
import useLiveNasdaqStore from '@/stores/useLiveMarketStore';
import { useMemo, useState } from 'react';
import { Title } from './components/title';
import { AlertDialogDemo } from './components/alert-dialog-demo';
import { CardDemo } from './components/card-demo';
import { SheetDemo } from './components/sheet-demo';
import { PopoverDemo } from './components/popover-demo';
import { ToastDemo } from './components/toast-demo';
import { TypographyDemo } from './components/typography-demo';

export default function Page() {
  const marketList = useLiveNasdaqStore((state) => state.marketList);
  const filter = useFilterStore((state) => state.filter);
  const [sortConfig, setSortConfig] = useState<string | null>('minChange');

  const sortedData = useMemo(() => {
    if (sortConfig !== null) {
      let filteredData = marketList;

      // filter.stock 으로 description 와 name 에서 like 필터
      // filter.stock 이 빈값이면 전체 데이터를 반환
      if (filter.stock) {
        filteredData = filteredData.filter(
          (item) =>
            item.name.toLowerCase().includes(filter.stock.toLowerCase()) ||
            item.description?.toLowerCase().includes(filter.stock.toLowerCase())
        );
      }

      // // filter.sector 으로 sector_tr 에서 like 필터
      if (filter.sector && filter.sector !== 'all') {
        filteredData = filteredData.filter((item) =>
          item.sector_tr?.toLowerCase().includes(filter.sector.toLowerCase())
        );
      }

      // // filter.minVolume 으로 volume 보다 큰 거래량만 필터
      if (filter.minVolume) {
        filteredData = filteredData.filter(
          (item) => Number(item.volume) >= filter.minVolume
        );
      }

      // // filter.minGrowthRate 으로 minChange 보다 큰 값만 필터
      if (filter.minGrowthRate) {
        filteredData = filteredData.filter(
          (item) => Number(item.minChange) >= filter.minGrowthRate
        );
      }

      // // filter.avgGrowthRate 으로 avgChange 보다 큰 값만 필터
      if (filter.avgGrowthRate) {
        filteredData = filteredData.filter(
          (item) => Number(item.avgChange) >= filter.avgGrowthRate
        );
      }

      return [...filteredData]
        .sort((a, b) => {
          const aValue = Number(a[sortConfig as keyof IStock]);
          const bValue = Number(b[sortConfig as keyof IStock]);

          if (aValue < bValue) {
            return 1;
          } else {
            return -1;
          }
        })
        .slice(0, filter.displayItemCount); // 처음 100개 항목만 선택
    }
    return marketList;
  }, [marketList, sortConfig, filter]);

  return (
    <>
      <Title />
      <AlertDialogDemo />
      <CardDemo />
      <SheetDemo />
      <PopoverDemo />
      <ToastDemo />
      <TypographyDemo />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>name</TableHead>
            <TableHead>description</TableHead>
            <TableHead>섹터</TableHead>
            <TableHead className="w-10">현재가격</TableHead>
            <TableHead>거래량</TableHead>
            <TableHead
              className={`cursor-pointer ${
                sortConfig === 'minChange' ? 'bg-red-300 text-white' : ''
              }`}
              onClick={() => setSortConfig('minChange')}
            >
              최소
            </TableHead>
            <TableHead
              className={`cursor-pointer ${
                sortConfig === 'avgChange' ? 'bg-red-300 text-white' : ''
              }`}
              onClick={() => setSortConfig('avgChange')}
            >
              평균
            </TableHead>
            <TableHead
              className={`cursor-pointer ${
                sortConfig === 'maxChange' ? 'bg-red-300 text-white' : ''
              }`}
              onClick={() => setSortConfig('maxChange')}
            >
              최대
            </TableHead>
            <TableHead
              className={`cursor-pointer ${
                sortConfig === 'full_model_1h_prediction'
                  ? 'bg-red-300 text-white'
                  : ''
              }`}
              onClick={() => setSortConfig('full_model_1h_prediction')}
            >
              1h
            </TableHead>
            <TableHead>2h</TableHead>
            <TableHead>3h</TableHead>
            <TableHead>4h</TableHead>
            <TableHead>5h</TableHead>
            <TableHead>6h</TableHead>
            <TableHead>7h</TableHead>
            <TableHead>8h</TableHead>
            <TableHead>9h</TableHead>
            <TableHead>10h</TableHead>
            <TableHead>11h</TableHead>
            <TableHead>12h</TableHead>
            <TableHead>13h</TableHead>
            <TableHead>14h</TableHead>
            <TableHead>15h</TableHead>
            <TableHead>16h</TableHead>
            <TableHead>17h</TableHead>
            <TableHead>18h</TableHead>
            <TableHead>19h</TableHead>
            <TableHead>20h</TableHead>
            <TableHead>21h</TableHead>
            <TableHead>22h</TableHead>
            <TableHead>23h</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((live) => (
            <TableRow key={live.name}>
              <TableCell>{live.name}</TableCell>
              <TableCell
                className="truncate max-w-[20ch]"
                title={live.description}
              >
                {live.description}
              </TableCell>
              <TableCell className="truncate">{live.sector_tr}</TableCell>
              <TableCell>{live.close}</TableCell>
              <TableCell>{Number(live.volume).toLocaleString()}</TableCell>
              <TableCell>{live.minChange}%</TableCell>
              <TableCell>{live.avgChange}%</TableCell>
              <TableCell>{live.maxChange}%</TableCell>
              <TableCell>
                {Number(live.full_model_1h_prediction)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {Number(live.full_model_2h_prediction)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {Number(live.full_model_3h_prediction)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {Number(live.full_model_4h_prediction)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {Number(live.full_model_5h_prediction)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {Number(live.full_model_6h_prediction)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {Number(live.full_model_7h_prediction)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {Number(live.full_model_8h_prediction)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {Number(live.full_model_9h_prediction)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {Number(live.full_model_10h_prediction)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {Number(live.full_model_11h_prediction)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {Number(live.full_model_12h_prediction)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {Number(live.full_model_13h_prediction)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {Number(live.full_model_14h_prediction)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {Number(live.full_model_15h_prediction)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {Number(live.full_model_16h_prediction)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {Number(live.full_model_17h_prediction)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {Number(live.full_model_18h_prediction)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {Number(live.full_model_19h_prediction)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {Number(live.full_model_20h_prediction)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {Number(live.full_model_21h_prediction)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {Number(live.full_model_22h_prediction)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {Number(live.full_model_23h_prediction)?.toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
    // <div className="flex flex-1 flex-col gap-4 p-4">
    //   <Title />
    //   <AlertDialogDemo />
    //   <CardDemo />
    //   <SheetDemo />
    //   <PopoverDemo />
    //   <ToastDemo />
    //   <TypographyDemo />
    //   <Chart />
    //   {Array.from({ length: 24 }).map((_, index) => (
    //     <div
    //       key={index}
    //       className="aspect-video h-12 w-full rounded-lg bg-muted/50"
    //     />
    //   ))}
    // </div>
  );
}

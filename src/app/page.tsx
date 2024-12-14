'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import IStock from '@/interface/IStock';
import { TBuy } from '@/interface/TBuy';
import { useGetBuyQuery } from '@/query/buy/useGetBuyQuery';
import { useGetInterestQuery } from '@/query/interest/useGetInterestQuery';
import { useAuthStore } from '@/stores/useAuthStore';
import useFilterStore from '@/stores/useFilterStore';
import useLiveMarketStore from '@/stores/useLiveMarketStore';
import { useMemo } from 'react';
import { FaSort, FaSortDown } from 'react-icons/fa';

export default function Home() {
  // store
  const { user } = useAuthStore(); // 유저 정보
  const { marketName, marketList, setMarketId } = useLiveMarketStore();
  const { filter, setFilter } = useFilterStore();

  // query
  const buyQuery = useGetBuyQuery(user?.id);
  const interestQuery = useGetInterestQuery(user?.id);

  // filter and sort
  const sortedData = useMemo(() => {
    if (filter.sortConfig !== null) {
      let filteredData = marketList;

      // filter.stock 으로 description 와 name 에서 like 필터
      // filter.stock 이 빈값이면 전체 데이터를 반환
      if (filter.stock) {
        // 종목 명 검색시에는 다른 필터가 적용이 안되도록
        filteredData = filteredData.filter(
          (item) =>
            item.name.toLowerCase().includes(filter.stock.toLowerCase()) ||
            item.description?.toLowerCase().includes(filter.stock.toLowerCase())
        );
      } else {
        // // filter.sector 으로 sector_tr 에서 like 필터
        if (filter?.screener?.length > 0) {
          filteredData = filteredData.filter((item) =>
            filter.screener.includes(item.name)
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
      }

      if (filter.sortConfig !== '') {
        return [...filteredData]
          .sort((a, b) => {
            const aValue = Number(a[filter.sortConfig as keyof IStock]);
            const bValue = Number(b[filter.sortConfig as keyof IStock]);

            if (aValue < bValue) {
              return 1;
            } else {
              return -1;
            }
          })
          .slice(0, filter.displayItemCount); // 처음 100개 항목만 선택
      } else {
        return [...filteredData].slice(0, filter.displayItemCount); // 처음 100개 항목만 선택
      }
    }
    return marketList;
  }, [marketList, filter]);

  // 로우 클릭시
  const rowClick = (name: string) => {
    setMarketId(name);
    setFilter({ ...filter, isDialogOpen: true });
  };

  // 해당 로우가 구매한 종목인가?
  const isBuy = (name: string) => {
    return buyQuery.data?.some((item: TBuy) => item.name === name);
  };

  // 해당 로우가 관심종목인가?
  const isInterest = (name: string) => {
    return interestQuery.data?.some((item: TBuy) => item.name === name);
  };

  return (
    <>
      <Table className={`bg-background border-spacing-0 border-separate`}>
        <TableHeader className={`bg-background sticky top-0 z-50`}>
          <TableRow>
            <TableHead>logo</TableHead>
            <TableHead>name</TableHead>
            <TableHead>description</TableHead>
            <TableHead>섹터</TableHead>
            <TableHead className="w-10">현재가격</TableHead>
            <TableHead>거래량</TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => {
                if (filter.sortConfig === 'minChange') {
                  setFilter({ ...filter, sortConfig: '' });
                } else {
                  setFilter({ ...filter, sortConfig: 'minChange' });
                }
              }}
            >
              <div className="flex items-center gap-2">
                최소
                {filter.sortConfig === 'minChange' ? (
                  <FaSortDown />
                ) : (
                  <FaSort className="text-neutral-300" />
                )}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => {
                if (filter.sortConfig === 'avgChange') {
                  setFilter({ ...filter, sortConfig: '' });
                } else {
                  setFilter({ ...filter, sortConfig: 'avgChange' });
                }
              }}
            >
              <div className="flex items-center gap-2">
                평균
                {filter.sortConfig === 'avgChange' ? (
                  <FaSortDown />
                ) : (
                  <FaSort className="text-neutral-300" />
                )}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => {
                if (filter.sortConfig === 'maxChange') {
                  setFilter({ ...filter, sortConfig: '' });
                } else {
                  setFilter({ ...filter, sortConfig: 'maxChange' });
                }
              }}
            >
              <div className="flex items-center gap-2">
                최대
                {filter.sortConfig === 'maxChange' ? (
                  <FaSortDown />
                ) : (
                  <FaSort className="text-neutral-300" />
                )}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => {
                if (filter.sortConfig === 'full_model_1h_prediction') {
                  setFilter({ ...filter, sortConfig: '' });
                } else {
                  setFilter({
                    ...filter,
                    sortConfig: 'full_model_1h_prediction',
                  });
                }
              }}
            >
              <div className="flex items-center gap-2">
                1h
                {filter.sortConfig === 'full_model_1h_prediction' ? (
                  <FaSortDown />
                ) : (
                  <FaSort className="text-neutral-300" />
                )}
              </div>
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
            <TableRow
              className={`cursor-pointer 
                ${marketName === live.name ? 'bg-accent' : ''}
                ${
                  isInterest(live.name)
                    ? 'bg-yellow hover:bg-yellow-foreground'
                    : ''
                }
                ${isBuy(live.name) ? 'bg-sky hover:bg-sky-foreground' : ''}
              `}
              key={live.name}
              onClick={() => rowClick(live.name)}
            >
              <TableCell>
                <Avatar className="border">
                  <AvatarImage
                    src={`https://s3-symbol-logo.tradingview.com/${live.logoid}--big.svg`}
                    alt="@radix-vue"
                  />
                  <AvatarFallback>
                    {live.description?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{live.name}</TableCell>
              <TableCell
                className="truncate max-w-[20ch]"
                title={live.description}
              >
                {live.description}
              </TableCell>
              <TableCell className="truncate">{live.sector_tr}</TableCell>
              <TableCell
                className={`${
                  Number(live.change) > 0
                    ? 'text-red-500'
                    : Number(live.change) < 0
                    ? 'text-blue-500'
                    : ''
                }`}
              >
                {live.close}({Number(live.change).toFixed(2)}%)
              </TableCell>
              <TableCell
                className={`${
                  Number(live.volume_change) > 0
                    ? 'text-red-500'
                    : Number(live.volume_change) < 0
                    ? 'text-blue-500'
                    : ''
                }`}
              >
                {Number(live.volume).toLocaleString()}(
                {Number(live.volume_change).toFixed(2)}%)
              </TableCell>
              <TableCell>{live.minChange}%</TableCell>
              <TableCell>{live.avgChange}%</TableCell>
              <TableCell>{live.maxChange}%</TableCell>
              <TableCell>
                {(Number(live.full_model_1h_prediction) * 100)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {(Number(live.full_model_2h_prediction) * 100)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {(Number(live.full_model_3h_prediction) * 100)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {(Number(live.full_model_4h_prediction) * 100)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {(Number(live.full_model_5h_prediction) * 100)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {(Number(live.full_model_6h_prediction) * 100)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {(Number(live.full_model_7h_prediction) * 100)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {(Number(live.full_model_8h_prediction) * 100)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {(Number(live.full_model_9h_prediction) * 100)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {(Number(live.full_model_10h_prediction) * 100)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {(Number(live.full_model_11h_prediction) * 100)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {(Number(live.full_model_12h_prediction) * 100)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {(Number(live.full_model_13h_prediction) * 100)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {(Number(live.full_model_14h_prediction) * 100)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {(Number(live.full_model_15h_prediction) * 100)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {(Number(live.full_model_16h_prediction) * 100)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {(Number(live.full_model_17h_prediction) * 100)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {(Number(live.full_model_18h_prediction) * 100)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {(Number(live.full_model_19h_prediction) * 100)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {(Number(live.full_model_20h_prediction) * 100)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {(Number(live.full_model_21h_prediction) * 100)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {(Number(live.full_model_22h_prediction) * 100)?.toFixed(2)}%
              </TableCell>
              <TableCell>
                {(Number(live.full_model_23h_prediction) * 100)?.toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

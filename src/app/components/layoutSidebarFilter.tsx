import {
  FaFilter,
  FaChartBar,
  FaArrowDown,
  FaEquals,
  FaList,
  FaSort,
} from "react-icons/fa";

import useFilterStore from "@/stores/useFilterStore";
import useLiveMarketStore from "@/stores/useLiveMarketStore";
import { useMemo } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import NumberField from "./NumberField";

export default function LayoutSidebarFilter() {
  const filter = useFilterStore((state) => state.filter);
  const setFilter = useFilterStore((state) => state.setFilter);

  const marketList = useLiveMarketStore((state) => state.marketList);
  const uniqueSectors = useMemo(() => {
    return Array.from(new Set(marketList.map((item) => item.sector_tr))).filter(
      (sector): sector is string => sector !== undefined
    );
  }, [marketList]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>필터</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="p-2 text-xs flex flex-col gap-1">
              <div className="flex items-center">
                <FaFilter className="mr-2" />
                색터 필터
              </div>
              <Select
                value={filter.sector}
                onValueChange={(value) =>
                  setFilter({ ...filter, sector: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="색터 필터를 선택하세요." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>색터 필터</SelectLabel>
                    <SelectItem value="all">전체</SelectItem>
                    {uniqueSectors?.map((sector: string) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className="p-2 text-xs flex flex-col gap-1">
              <div className="flex items-center">
                <FaChartBar className="mr-2" />
                최소 거래량
              </div>
              <NumberField
                value={filter.minVolume}
                onChange={(e) => {
                  const newValue = Number(e);
                  const oldValue = filter.minVolume;

                  if (newValue == 0 && oldValue > 10000) {
                    setFilter({
                      ...filter,
                      minVolume: oldValue * 0.9,
                    });
                  } else {
                    setFilter({
                      ...filter,
                      minVolume: Number(e),
                    });
                  }
                }}
                min={0}
                step={
                  filter.minVolume >= 1000000000
                    ? 1000000000
                    : filter.minVolume >= 100000000
                    ? 100000000
                    : filter.minVolume >= 10000000
                    ? 10000000
                    : filter.minVolume >= 1000000
                    ? 1000000
                    : filter.minVolume >= 100000
                    ? 100000
                    : 10000
                }
              />
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className="p-2 text-xs flex flex-col gap-1">
              <div className="flex items-center">
                <FaArrowDown className="mr-2" />
                최소 최소 상승가능성률
              </div>
              <NumberField
                value={filter.minGrowthRate}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    minGrowthRate: Number(e),
                  })
                }
                min={0}
                step={5}
              />
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className="p-2 text-xs flex flex-col gap-1">
              <div className="flex items-center">
                <FaEquals className="mr-2" />
                최소 평균 상승가능성률
              </div>
              <NumberField
                value={filter.avgGrowthRate}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    avgGrowthRate: Number(e),
                  })
                }
                min={0}
                step={5}
              />
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className="p-2 text-xs flex flex-col gap-1">
              <div className="flex items-center">
                <FaList className="mr-2" />
                표시 아이탬 수
              </div>
              <Select
                value={filter.displayItemCount.toString()}
                onValueChange={(value) =>
                  setFilter({
                    ...filter,
                    displayItemCount: Number(value),
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="아이탬 수를 선택하세요." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>표시 아이탬 수</SelectLabel>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                    <SelectItem value="200">200</SelectItem>
                    <SelectItem value="300">300</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className="p-2 text-xs flex flex-col gap-1">
              <div className="flex items-center">
                <FaSort className="mr-2" />
                정렬
              </div>
              <Select
                value={filter.sortConfig.toString()}
                onValueChange={(value) =>
                  setFilter({
                    ...filter,
                    sortConfig: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="아이탬 수를 선택하세요." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>정렬</SelectLabel>
                    <SelectItem value="minChange">최소</SelectItem>
                    <SelectItem value="avgChange">평균</SelectItem>
                    <SelectItem value="maxChange">최대</SelectItem>
                    <SelectItem value="full_model_1h_prediction">1h</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

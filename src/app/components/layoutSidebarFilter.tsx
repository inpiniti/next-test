import {
  FaFilter,
  FaChartBar,
  FaArrowDown,
  FaEquals,
  FaList,
} from 'react-icons/fa';

import useFilterStore from '@/stores/useFilterStore';
import useLiveNasdaqStore from '@/stores/useLiveNasdaqStore';
import { useMemo } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { Input } from '@/components/ui/input';

export default function LayoutSidebarFilter() {
  const filter = useFilterStore((state) => state.filter);
  const setFilter = useFilterStore((state) => state.setFilter);

  const liveNasdaqList = useLiveNasdaqStore((state) => state.liveNasdaqList);
  const uniqueSectors = useMemo(() => {
    return Array.from(
      new Set(liveNasdaqList.map((item) => item.sector_tr))
    ).filter((sector): sector is string => sector !== undefined);
  }, [liveNasdaqList]);

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
                <SelectTrigger className="bg-white">
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
            <div className="p-2 text-xs  flex flex-col gap-1">
              <div className="flex items-center">
                <FaChartBar className="mr-2" />
                최소 거래량
              </div>
              <Input
                className="bg-white"
                value={filter.minVolume}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    minVolume: Number(e.target.value),
                  })
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
              <Input
                className="bg-white"
                value={filter.minGrowthRate}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    minGrowthRate: Number(e.target.value),
                  })
                }
              />
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className="p-2 text-xs flex flex-col gap-1">
              <div className="flex items-center">
                <FaEquals className="mr-2" />
                최소 평균 상승가능성률
              </div>
              <Input
                className="bg-white"
                value={filter.avgGrowthRate}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    avgGrowthRate: Number(e.target.value),
                  })
                }
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
                <SelectTrigger className="bg-white">
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
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

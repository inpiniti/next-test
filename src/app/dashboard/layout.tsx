"use client";

import { Input } from "@/components/ui/input";
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
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import useLiveNasdaqQuery from "@/hooks/useLiveNasdaqQuery";
import useFilterStore from "@/stores/useFilterStore";
import useLiveNasdaqStore from "@/stores/useLiveNasdaqStore";
import { useMemo } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const query = useLiveNasdaqQuery();
  const filter = useFilterStore((state) => state.filter);
  const setFilter = useFilterStore((state) => state.setFilter);
  const liveNasdaqList = useLiveNasdaqStore((state) => state.liveNasdaqList);

  const uniqueSectors = useMemo(() => {
    return Array.from(
      new Set(liveNasdaqList.map((item) => item.sector_tr))
    ).filter((sector): sector is string => sector !== undefined);
  }, [liveNasdaqList]);

  return (
    <SidebarProvider>
      <Sidebar className="shrink-0">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <Input />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a>
                      <span>코스피</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a>
                      <span>코스닥</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a>
                      <span>나스닥</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>필터</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <div className="p-2 text-xs">
                    종목 검색
                    <Input
                      className="bg-white"
                      value={filter.stock}
                      onChange={(e) =>
                        setFilter({ ...filter, stock: e.target.value })
                      }
                    />
                  </div>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <div className="p-2 text-xs">
                    색터 필터
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
                  <div className="p-2 text-xs">
                    최소 거래량
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
                  <div className="p-2 text-xs">
                    최소 최소 상승가능성률
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
                  <div className="p-2 text-xs">
                    최소 평균 상승가능성률
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
                  <div className="p-2 text-xs">
                    표시 아이탬 수
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
                          <SelectItem value="500">500</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      <div className="w-full h-screen flex flex-col divide-y overflow-hidden">
        <div className="shrink-0 p-2 flex items-center gap-4 bg-neutral-50">
          <SidebarTrigger />
          header
          <Input type="email" placeholder="종목검색" className="w-fit" />
          {(query.isLoading || query.isFetching) && <div>로딩 중...</div>}
        </div>
        <div className="grow-1 h-full overflow-scroll">{children}</div>
      </div>
    </SidebarProvider>
  );
}

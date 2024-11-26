"use client";

import { Input } from "@/components/ui/input";
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

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const query = useLiveNasdaqQuery();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
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
                      <Input className="bg-white" />
                    </div>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <div className="p-2 text-xs">
                      색터 필터
                      <Input className="bg-white" />
                    </div>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <div className="p-2 text-xs">
                      최소 거래량
                      <Input className="bg-white" />
                    </div>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <div className="p-2 text-xs">
                      최소 최소 상승가능성률
                      <Input className="bg-white" />
                    </div>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <div className="p-2 text-xs">
                      최소 평균 상승가능성률
                      <Input className="bg-white" />
                    </div>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <div className="p-2 text-xs">
                      표시 아이탬 수
                      <Input className="bg-white" />
                    </div>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>
        <div className="grow-1 w-full flex flex-col divide-y">
          <div className="shrink-0 p-2 flex items-center gap-4 bg-neutral-50">
            <SidebarTrigger />
            header
            <Input type="email" placeholder="종목검색" className="w-fit" />
            {(query.isLoading || query.isFetching) && <div>로딩 중...</div>}
          </div>
          <div className="grow-1 h-full overflow-scroll">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}

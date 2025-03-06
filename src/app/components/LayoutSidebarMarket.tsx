import { FaBuilding, FaIndustry, FaChartBar } from 'react-icons/fa';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

import useFilterStore from '@/stores/useFilterStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronsUpDown } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import useLiveSeoulQuery from '@/hooks/useLiveSeoulQuery';
import useLiveKosdaqQuery from '@/hooks/useLiveKosdaqQuery';
import useLiveNasdaqQuery from '@/hooks/useLiveNasdaqQuery';
import useLiveMarketStore from '@/stores/useLiveMarketStore';

export default function LayoutSidebarMarket() {
  const { isMobile } = useSidebar();

  // store
  const { filter, setFilter } = useFilterStore();
  const { setMarketList } = useLiveMarketStore();

  // query
  const seoulQuery = useLiveSeoulQuery();
  const kosdaqQuery = useLiveKosdaqQuery();
  const nasdaqQuery = useLiveNasdaqQuery();
  useEffect(() => {
    if (filter.market) {
      queryRefetch(filter.market);
    }
  }, []);

  // useEffect(() => {
  //   if (filter.market) {
  //     switch (filter.market) {
  //       case 'seoul':
  //         seoulQuery.refetch().then((res) => {
  //           setMarketList(res.data);
  //         });
  //         break;
  //       case 'kosdaq':
  //         kosdaqQuery.refetch().then((res) => {
  //           setMarketList(res.data);
  //         });
  //         break;
  //       case 'nasdaq':
  //         nasdaqQuery.refetch().then((res) => {
  //           setMarketList(res.data);
  //         });
  //         break;
  //     }
  //   }
  // }, [filter.market]);

  // 드랍다운 메뉴 변경 시
  const selectedHnadler = (market: string) => {
    setFilter({ ...filter, market });
    queryRefetch(market);
  };

  const queryRefetch = (market: string) => {
    switch (market) {
      case 'seoul':
        seoulQuery.refetch().then((res) => {
          setMarketList(res.data);
        });
        break;
      case 'kosdaq':
        kosdaqQuery.refetch().then((res) => {
          setMarketList(res.data);
        });
        break;
      case 'nasdaq':
        nasdaqQuery.refetch().then((res) => {
          setMarketList(res.data);
        });
        break;
    }
  };

  // filter market 한글명
  const koreanMarket = useMemo(() => {
    return filter.market === 'seoul'
      ? '코스피'
      : filter.market === 'kosdaq'
      ? '코스닥'
      : '나스닥';
  }, [filter.market]);

  // filter market 아이콘
  const marketIcon = useMemo(() => {
    switch (filter.market) {
      case 'seoul':
        return <FaBuilding />;
      case 'kosdaq':
        return <FaIndustry />;
      case 'nasdaq':
        return <FaChartBar />;
      default:
        return null;
    }
  }, [filter.market]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {marketIcon}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{filter.market}</span>
                <span className="truncate text-xs">{koreanMarket}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Market
            </DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => selectedHnadler('seoul')}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <FaBuilding />
              </div>
              코스피
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => selectedHnadler('kosdaq')}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <FaIndustry />
              </div>
              코스닥
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => selectedHnadler('nasdaq')}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <FaChartBar />
              </div>
              나스닥
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

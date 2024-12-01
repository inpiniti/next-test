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
import useLiveNasdaqQuery from '@/hooks/useLiveNasdaqQuery';
import useLiveSeoulQuery from '@/hooks/useLiveSeoulQuery';
import useLiveKosdaqQuery from '@/hooks/useLiveKosdaqQuery';

export default function LayoutSidebarMarket() {
  const { isMobile } = useSidebar();
  const { filter, setFilter } = useFilterStore();

  const { query: seoulQuery, toggleFetching: seoulToggle } =
    useLiveSeoulQuery();
  const { query: kosdaqQuery, toggleFetching: kosdaqToggle } =
    useLiveKosdaqQuery();
  const { query: nasdaqQuery, toggleFetching: nasdaqToggle } =
    useLiveNasdaqQuery();

  const koreanMarket = useMemo(() => {
    return filter.market === 'seoul'
      ? '코스피'
      : filter.market === 'kosdaq'
      ? '코스닥'
      : '나스닥';
  }, [filter.market]);

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

  useEffect(() => {
    seoulToggle(false);
    kosdaqToggle(false);
    nasdaqToggle(false);

    switch (filter.market) {
      case 'seoul':
        seoulToggle(true);
        break;
      case 'kosdaq':
        kosdaqToggle(true);
        break;
      case 'nasdaq':
        nasdaqToggle(true);
        break;
      default:
        // Perform side effect for default case
        break;
    }
  }, [
    filter.market,
    seoulQuery,
    seoulToggle,
    kosdaqQuery,
    kosdaqToggle,
    nasdaqQuery,
    nasdaqToggle,
  ]);

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
              onClick={() => setFilter({ ...filter, market: 'seoul' })}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <FaBuilding />
              </div>
              코스피
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilter({ ...filter, market: 'kosdaq' })}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <FaIndustry />
              </div>
              코스닥
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilter({ ...filter, market: 'nasdaq' })}
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

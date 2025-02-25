'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
} from '@/components/ui/sidebar';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Navigation } from '@/components/navigation';
import AppSidebarItem from '@/components/app-sidebar-item';

import React from 'react';

import { navMain } from '@/data/navMain';
//import { mails as _mails } from "@/data/mails";

import IStock from '@/interface/IStock';
import useLiveNasdaqStore from '@/stores/useLiveMarketStore';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem] = React.useState(navMain[0]);
  const marketList = useLiveNasdaqStore((state) => state.marketList);
  //const [mails] = React.useState(_mails);

  return (
    <Sidebar
      data-testid="potatomap-component"
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      app-sidebar
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Navigation />
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              {activeItem.title}
            </div>
            <Label className="flex items-center gap-2 text-sm">
              <span>Unreads</span>
              <Switch className="shadow-none" />
            </Label>
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {marketList?.map((stock: IStock) => (
                <AppSidebarItem key={stock.name} stock={stock} />
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import LayoutSidebarMarket from './LayoutSidebarMarket';
import LayoutSidebarFilter from './layoutSidebarFilter';

export default function LayoutSidebar() {
  return (
    <Sidebar className="shrink-0">
      <SidebarHeader className="border-b border-sidebar-border">
        <LayoutSidebarMarket />
      </SidebarHeader>
      <SidebarContent>
        <LayoutSidebarFilter />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

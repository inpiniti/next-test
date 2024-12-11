import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import LayoutSidebarMarket from './LayoutSidebarMarket';
import LayoutSidebarFilter from './layoutSidebarFilter';
import { LayoutUser } from './layoutUser';
import { ComponentName } from '@/components/ComponentName';

export default function LayoutSidebar() {
  return (
    <Sidebar className="shrink-0">
      <ComponentName name="<layoutSidebar>" />
      <SidebarHeader className="border-b border-sidebar-border relative">
        <ComponentName
          name="<LayoutSidebarMarket>"
          className="bottom-0 right-0"
        />
        <LayoutSidebarMarket />
      </SidebarHeader>
      <SidebarContent>
        <LayoutSidebarFilter />
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border relative">
        <ComponentName name="<LayoutUser>" />
        <LayoutUser />
      </SidebarFooter>
    </Sidebar>
  );
}

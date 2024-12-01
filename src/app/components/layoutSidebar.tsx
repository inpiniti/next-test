import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import LayoutSidebarMarket from './LayoutSidebarMarket';
import LayoutSidebarFilter from './layoutSidebarFilter';
import { LayoutUser } from './layoutUser';

export default function LayoutSidebar() {
  const data = {
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg',
    },
  };

  return (
    <Sidebar className="shrink-0">
      <SidebarHeader className="border-b border-sidebar-border">
        <LayoutSidebarMarket />
      </SidebarHeader>
      <SidebarContent>
        <LayoutSidebarFilter />
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <LayoutUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

import { ComponentName } from '@/components/ComponentName';
import { SettingsDialog } from '@/components/setting-dialog';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import useFilterStore from '@/stores/useFilterStore';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

export default function LayoutHeader() {
  const { filter, setFilter } = useFilterStore();

  return (
    <div className="shrink-0 p-2 flex items-center justify-between h-16 relative">
      <ComponentName name="<layoutHeader>" />
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Input
          className={`w-fit`}
          value={filter.stock}
          onChange={(e) => setFilter({ ...filter, stock: e.target.value })}
          placeholder="종목검색"
        />
        <div className="hidden md:flex gap-2">
          <Tabs defaultValue="account">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="account">전종목</TabsTrigger>
              <TabsTrigger value="password3" disabled>
                가격대비 뛰어난 성과
              </TabsTrigger>
              <TabsTrigger value="password3" disabled>
                강력한 오름세
              </TabsTrigger>
              <TabsTrigger value="password3" disabled>
                혁신적인 기업
              </TabsTrigger>
              <TabsTrigger value="password3" disabled>
                저평가된 주식
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <SettingsDialog />
        </div>
      </div>
      <div>
        <ThemeToggle />
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setFilter({ ...filter, asideOpen: !filter.asideOpen });
          }}
        >
          {filter.asideOpen ? <FaBookmark /> : <FaRegBookmark />}
        </Button>
      </div>
    </div>
  );
}

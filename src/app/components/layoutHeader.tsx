import { SettingsDialog } from '@/components/setting-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import useFilterStore from '@/stores/useFilterStore';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

export default function LayoutHeader() {
  const { filter, setFilter } = useFilterStore();

  return (
    <div className="shrink-0 p-2 flex items-center justify-between h-16 bg-neutral-50">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Input
          className="bg-white w-fit"
          value={filter.stock}
          onChange={(e) => setFilter({ ...filter, stock: e.target.value })}
          placeholder="종목검색"
        />
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
  );
}

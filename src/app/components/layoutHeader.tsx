import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import useFilterStore from '@/stores/useFilterStore';

export default function LayoutHeader() {
  const { filter, setFilter } = useFilterStore();

  return (
    <div className="shrink-0 p-2 flex items-center gap-4  h-16">
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
          <TabsTrigger value="password" disabled>
            구매 목록
          </TabsTrigger>
          <TabsTrigger value="password2" disabled>
            관심 종목
          </TabsTrigger>
          <TabsTrigger value="password3" disabled>
            종목 토론
          </TabsTrigger>
          <TabsTrigger value="password4">테스트</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

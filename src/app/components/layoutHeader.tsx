import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';

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
      <Button>전체</Button>
      <Button variant="secondary">구매 목록 (미구현)</Button>
      <Button variant="secondary">관심 종목 (미구현)</Button>
    </div>
  );
}

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
    </div>
  );
}
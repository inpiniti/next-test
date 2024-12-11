import { ComponentName } from "@/components/ComponentName";
import { SettingsDialog } from "@/components/setting-dialog";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useConsistentDividendQuery } from "@/query/toss/useConsistentDividendQuery";
import { useEscapingUndervaluedQuery } from "@/query/toss/useEscapingUndervaluedQuery";
import { useGrowthExpectationQuery } from "@/query/toss/useGrowthExpectationQuery";
import { useHighProfitUndervaluedQuery } from "@/query/toss/useHighProfitUndervaluedQuery";
import { useInexpensiveValueQuery } from "@/query/toss/useInexpensiveValueQuery";
import { useProfitableCompaniesQuery } from "@/query/toss/useProfitableCompaniesQuery";
import { useRisingQuery } from "@/query/toss/useRisingQuery";
import { useUndervaluedGrowthQuery } from "@/query/toss/useUndervaluedGrowthQuery";

import useFilterStore from "@/stores/useFilterStore";
import { set } from "date-fns";
import { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function LayoutHeader() {
  const { filter, setFilter } = useFilterStore();
  const [screener, setScreener] = useState("all");

  // 연속 상승세
  const { data: rising } = useRisingQuery();

  // 저평가 성장주
  const { data: undervaluedGrowth } = useUndervaluedGrowthQuery();

  // 아직 저렴한 가치주
  const { data: inexpensiveValue } = useInexpensiveValueQuery();

  // 꾸준한 배당주
  const { data: consistentDividend } = useConsistentDividendQuery();

  // 돈 잘 버는 회사
  const { data: profitableCompanies } = useProfitableCompaniesQuery();

  // 저평가 탈출
  const { data: escapingUndervalued } = useEscapingUndervaluedQuery();

  // 성장 기대주
  const { data: growthExpectation } = useGrowthExpectationQuery();

  // 고수익 저평가
  const { data: highProfitUndervalued } = useHighProfitUndervaluedQuery();

  // 트랜딩 주식 변경
  const handleDisplayItemCountChange = (value: string) => {
    setScreener(value);
    switch (value) {
      case "all":
        setFilter({
          ...filter,
          screener: [],
        });
        break;
      case "rising":
        setFilter({
          ...filter,
          screener: rising,
        });
        break;
      case "undervaluedGrowth":
        setFilter({
          ...filter,
          screener: undervaluedGrowth,
        });
        break;
      case "inexpensiveValue":
        setFilter({
          ...filter,
          screener: inexpensiveValue,
        });
        break;
      case "consistentDividend":
        setFilter({
          ...filter,
          screener: consistentDividend,
        });
        break;
      case "profitableCompanies":
        setFilter({
          ...filter,
          screener: profitableCompanies,
        });
        break;
      case "escapingUndervalued":
        setFilter({
          ...filter,
          screener: escapingUndervalued,
        });
        break;
      case "growthExpectation":
        setFilter({
          ...filter,
          screener: growthExpectation,
        });
        break;
      case "highProfitUndervalued":
        setFilter({
          ...filter,
          screener: highProfitUndervalued,
        });
        break;
    }
  };

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
          <Select value={screener} onValueChange={handleDisplayItemCountChange}>
            <SelectTrigger>
              <SelectValue placeholder="트랜딩 주식" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>트랜딩 주식</SelectLabel>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="rising">연속 상승세</SelectItem>
                <SelectItem value="undervaluedGrowth">저평가 성장주</SelectItem>
                <SelectItem value="inexpensiveValue">
                  아직 저렴한 가치주
                </SelectItem>
                <SelectItem value="consistentDividend">
                  꾸준한 배당주
                </SelectItem>
                <SelectItem value="profitableCompanies">
                  돈 잘 버는 회사
                </SelectItem>
                <SelectItem value="escapingUndervalued">저평가 탈출</SelectItem>
                <SelectItem value="growthExpectation">성장 기대주</SelectItem>
                <SelectItem value="highProfitUndervalued">
                  고수익 저평가
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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

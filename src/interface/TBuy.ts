export type TBuy = {
  key?: string; // 저장되고 나야 키가 생기기 때문에 optional
  id?: string;
  name?: string;
  number?: number;
  price?: number;
  created_at?: Date; // 저장 시점에 생성일이 생기기 때문에 optional
};

import db from "@/lib/db"; // import the db connection
import { tossTable } from "@/db/tossTable";

export const select = async () => {
  const result = await db.select().from(tossTable);
  return result;
};

export const insert = async (body: { stockCode: string; symbol: string }) => {
  const result = await db.insert(tossTable).values([body]);
  return result;
};

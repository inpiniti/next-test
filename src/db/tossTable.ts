// CREATE TABLE toss (
//     stockCode VARCHAR(10) PRIMARY KEY,
//     symbol VARCHAR(10)
// );

// 위 쿼리를 참조해서
import { pgTable, text } from "drizzle-orm/pg-core";

export const tossTable = pgTable("toss", {
  stockCode: text("stockcode").primaryKey(),
  symbol: text("symbol"),
});

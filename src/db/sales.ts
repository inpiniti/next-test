import { pgTable, serial, text, numeric, timestamp } from 'drizzle-orm/pg-core';

export const salesTable = pgTable('sales', {
  key: serial('key').primaryKey(),
  id: numeric('id').notNull(),
  name: text('name').notNull(),
  number: numeric('number').notNull(),
  buy_price: numeric('buy_price').notNull(),
  sales_price: numeric('sales_price').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

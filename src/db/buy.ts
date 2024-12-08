import { pgTable, serial, text, numeric, timestamp } from 'drizzle-orm/pg-core';

export const buyTable = pgTable('buy', {
  key: serial('key').primaryKey(),
  id: numeric('id').notNull(),
  name: text('name').notNull(),
  number: numeric('number').notNull(),
  price: numeric('price').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

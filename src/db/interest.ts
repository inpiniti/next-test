import { pgTable, serial, text, numeric } from 'drizzle-orm/pg-core';

export const interestTable = pgTable('interest', {
  key: serial('key').primaryKey(),
  id: numeric('id').notNull(),
  name: text('name').notNull(),
});

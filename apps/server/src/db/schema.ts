import {
  pgTable,
  uuid,
  varchar,
  smallint,
  timestamp,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar(`name`, { length: 255 }).notNull(),
  email: varchar(`email`, { length: 255 }).unique().notNull(),
  password_hash: varchar(`password_hash`, { length: 255 }).notNull(),
  payday_date: smallint(`payday_date`).notNull().default(1),
  alert_threshold: smallint(`alert_threshold`).notNull().default(80),
  created_at: timestamp(`created_at`, { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

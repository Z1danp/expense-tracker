import { sql } from 'drizzle-orm';
import {
  pgTable,
  uuid,
  varchar,
  smallint,
  timestamp,
  pgEnum,
  boolean,
  unique,
  bigint,
  index,
  check,
} from 'drizzle-orm/pg-core';

// users entity
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

// categories entity
export const categoryTypeEnum = pgEnum('category_type', [
  'expense',
  'income',
]);
export const categories = pgTable(
  'categories',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    user_id: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 255 }).notNull(),
    type: categoryTypeEnum('type').notNull(),
    limit_amount: bigint('limit_amount', { mode: 'number' }), // Nullable (tanpa .notNull())
    is_active: boolean('is_active').notNull().default(true),
    created_at: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    // 🛡️ CHECK Constraint yang kamu tanyakan:
    check(
      'chk_category_limit_rule',
      sql`(${table.type} = 'income' AND ${table.limit_amount} IS NULL) OR (${table.type} = 'expense' AND ${table.limit_amount} > 0)`
    ),
    // 🔒 UNIQUE per user (user tidak boleh punya 2 kategori dengan nama sama)
    unique('uq_categories_user_name').on(table.user_id, table.name),
    // ⚡ Index untuk mempercepat query user
    index('idx_categories_user_id').on(table.user_id),
  ]
);


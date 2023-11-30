import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const magicLinks = pgTable("magic_links", {
  id: uuid("id").defaultRandom().primaryKey(),

  token_hash: text("token_hash").notNull(),
  expires_at: timestamp("expires_at", { withTimezone: true }).defaultNow().notNull(),

  user_email: text("user_email").notNull(),
  user_id: uuid("user_id").references(() => users.id),

}, table => ({ tokenHashIdx: index("token_hash_idx").on(table.token_hash) }))

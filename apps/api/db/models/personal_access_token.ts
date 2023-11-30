import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const personalAccessTokens = pgTable("personal_access_tokens", {
  id: uuid("id").defaultRandom().primaryKey(),

  user_id: uuid("user_id").references(() => users.id),
  expires_at: timestamp("expires_at", { withTimezone: true }).notNull(),

  comment: text("comment").notNull(),

  last_used_at: timestamp("last_used_at", { withTimezone: true }),

})

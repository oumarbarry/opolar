import { index, pgTable, text, uuid } from "drizzle-orm/pg-core"

export const invites = pgTable("invites", {
  id: uuid("id").defaultRandom().primaryKey(),

  code: text("code").notNull().unique(),
  note: text("note"),

  created_by: uuid("created_by").references(() => user.id).notNull(),
  claimed_by: uuid("claimed_by").references(() => user.id),

}, table => ({ codeIdx: index("code_idx").on(table.code) }))

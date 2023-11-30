import { index, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const notifications = pgTable("notifications", {
  id: uuid("id").defaultRandom().primaryKey(),

  user_id: uuid("user_id"),
  email_addr: uuid("email_addr"),

  organization_id: uuid("organization_id"),

  type: text("type").notNull(),

  issue_id: uuid("issue_id").references(() => issues.id),
  pledge_id: uuid("pledge_id").references(() => pledges.id),
  pull_request_id: uuid("pull_request_id").references(() => pullRequests.id),

  payload: jsonb("payload"),

}, table => ({ userIdx: index("idx_notifications_user_id").on(table.user_id) }))

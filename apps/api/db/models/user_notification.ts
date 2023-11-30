import { index, pgTable, text, uuid } from "drizzle-orm/pg-core"

export const userNotifications = pgTable("user_notifications", {
  id: uuid("id").defaultRandom().primaryKey(),

  user_id: uuid("user_id").references(() => users.id).primaryKey(),

  last_read_notification_id: uuid("last_read_notification_id").notNull(),
})

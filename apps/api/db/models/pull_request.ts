import { index, pgTable, text, uuid } from "drizzle-orm/pg-core"

export const pullRequests = pgTable("pull_requests", {
  id: uuid("id").defaultRandom().primaryKey(),

})

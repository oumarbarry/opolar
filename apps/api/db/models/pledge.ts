import { index, pgTable, text, uuid } from "drizzle-orm/pg-core"

export const pledges = pgTable("pledges", {
  id: uuid("id").defaultRandom().primaryKey(),

})

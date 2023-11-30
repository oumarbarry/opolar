import { index, pgTable, text, uuid } from "drizzle-orm/pg-core"

export const issues = pgTable("issues", {
  id: uuid("id").defaultRandom().primaryKey(),

})

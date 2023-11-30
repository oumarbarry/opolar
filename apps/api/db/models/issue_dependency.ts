import { index, pgTable, serial, text } from "drizzle-orm/pg-core"

export const invite = pgTable("issue_dependencies", {
  id: serial("id").primaryKey(),

  organization_id: text("organization_id").references(() => organization.id).notNull(),
  repository_id: text("repository_id").references(() => repository.id),

  dependent_issue_id: text("dependent_issue_id").references(() => issue.id),
  dependency_issue_id: text("dependency_issue_id").references(() => issue.id),

})

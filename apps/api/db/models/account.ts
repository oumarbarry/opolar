import { boolean, integer, jsonb, pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core"

const accountStatusEnum = pgEnum("status", ["created", "onboarding_started", "active"])

export const accounts = pgTable("accounts", {
  id: uuid("id").defaultRandom().primaryKey(),

  account_type: varchar("account_type", { length: 255 }).notNull(),
  organization_id: integer("organization_id").references(() => organizations.id).unique(),

  user_id: integer("user_id").references(() => users.id).unique(),
  admin_id: integer("admin_id").references(() => users.id).unique(),

  stripe_id: varchar("stripe_id", { length: 100 }),
  open_collective_slug: varchar("open_collective_slug", { length: 255 }),
  email: varchar("email", { length: 254 }),
  country: varchar("country", { length: 2 }),
  currency: varchar("currency", { length: 3 }),
  is_details_submitted: boolean("is_details_submitted").notNull(),
  is_charges_enabled: boolean("is_charges_enabled").notNull(),
  is_payouts_enabled: boolean("is_payouts_enabled").notNull(),
  business_type: varchar("business_type", { length: 255 }),
  status: accountStatusEnum("status"),
  data: jsonb("data"),
})

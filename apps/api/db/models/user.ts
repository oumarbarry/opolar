import { bigint, boolean, jsonb, pgTable, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: varchar("id", { length: 15 }).primaryKey(),
  username: varchar("username", { length: 50 }).unique().notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  email_verified: boolean("email_verified").default(false).notNull(),
  avatar_url: varchar("avatar_url", { length: 1024 }),

  profile: jsonb("profile"),

  invite_only_approved: boolean("invite_only_approved").default(false).notNull(),

  accepted_terms_of_service: boolean("accepted_terms_of_service").default(false).notNull(),

  last_seen_at_extension: timestamp("last_seen_at_extension", { withTimezone: true }),
  last_version_extension: varchar("last_version_extension", { length: 50 }),
  email_newsletters_and_changelogs: boolean("email_newsletters_and_changelogs").default(true).notNull(),
  email_promotions_and_events: boolean("email_promotions_and_events").default(true).notNull(),
  stripe_customer_id: varchar("stripe_customer_id").unique(),

}, table => ({ emailIdx: uniqueIndex("email_idx").on(table.email) }))

export const sessions = pgTable("sessions", {
  id: varchar("id", { length: 128 }).primaryKey(),
  userId: varchar("user_id", { length: 15 }).notNull().references(() => user.id),
  activeExpires: bigint("active_expires", { mode: "number" }).notNull(),
  idleExpires: bigint("idle_expires", { mode: "number" }).notNull(),
})

export const keys = pgTable("keys", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 15 }).notNull().references(() => user.id),
  hashedPassword: varchar("hashed_password", { length: 255 }),
})

import { boolean, integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

const organizationStatusEnum = pgEnum("status", ["inactive", "active", "suspended"])
const platformEnum = pgEnum("platform", ["github"])

export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  platform: platformEnum("platform").notNull(),
  name: text("name").unique().notNull(),
  external_id: integer("external_id").unique().notNull(),
  avatar_url: integer("avatar_url").notNull(),
  is_personal: boolean("is_personal").notNull(),

  installation_id: integer("installation_id").unique(),
  installation_created_at: timestamp("installation_created_at", { withTimezone: true }).default(null),
  installation_updated_at: timestamp("installation_updated_at", { withTimezone: true }).default(null),
  installation_suspended_at: timestamp("installation_suspended_at", { withTimezone: true }).default(null),

  status: organizationStatusEnum("status").default("active").notNull(),

  pledge_badge_show_amount: boolean("pledge_badge_show_amount").default(true).notNull(),

  pledge_minimum_amount: integer("pledge_minimum_amount").default(useRuntimeConfig().MINIMUM_ORG_PLEDGE_AMOUNT).notNull(),
})

const NotInstalledOrganization = createError({ statusCode: 400, statusMessage: "This organization is not installed." })

export function useOrganization(data: any) {
  const organization = data

  function polarSiteUrl() {
    return `${process.env.FRONTEND_BASE_URL}/${organization.name}`
  }

  function safeInstallationId() {
    if (organization.installation_id === null)
      throw NotInstalledOrganization

    return this.data.installation_id
  }

  return { polarSiteUrl, safeInstallationId }
}

import { index, integer, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const subscriptionTierBenefits = pgTable("subscription_tier_benefits", {
  id: uuid("id").defaultRandom().primaryKey(),

  subscriptionTierId = uuid("subscription_tier_id").references(() => subscriptionTiers.id),

  subscriptionBenefitId = uuid("subscription_benefit_id").references(() => subscriptionBenefits.id),

  order: integer("order").notNull(),

}, table => ({
  pk: primaryKey({ columns: [table.subscriptionTierId, table.subscriptionBenefitId] }),
  orderIdx: index("order_idx").on(table.order),
}))

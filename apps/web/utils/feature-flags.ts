import { useRuntimeConfig } from "nuxt/app"
import { posthog } from "posthog-js"

export function isFeatureEnabled(key: string): boolean {
  if (useRuntimeConfig().public.environment === "development") return true

  return posthog.isFeatureEnabled(key) || false
}

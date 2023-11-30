/*
 * Keys sorted by their countries name in English.
 *
 * Generated list from Stripe console settings using:
 *
 * let whitelist = []
 * document.querySelectorAll('.PressableContext').forEach((d) => { if (d.checked && d.name !== '') { whitelist.push(d.name) } })
 * whitelist.join(',')
 *
 * All countries supported by Stripe except Gibraltar (transfers not supported)
 *
 */
const STRIPE_COUNTRIES = "AL,AG,AR,AM,AU,AT,BH,BE,BO,BA,BG,KH,CA,CL,CO,CR,HR,CY,CZ,CI,DK,DO,EC,EG,SV,EE,ET,FI,FR,GM,DE,GH,GR,GT,GY,HK,HU,IS,IN,ID,IE,IL,IT,JM,JP,JO,KE,KW,LV,LI,LT,LU,MO,MG,MY,MT,MU,MX,MD,MN,MA,NA,NL,NZ,NG,MK,NO,OM,PA,PY,PE,PH,PL,PT,QA,RO,RW,SA,SN,RS,SG,SK,SI,ZA,KR,ES,LK,LC,SE,CH,TZ,TH,TT,TN,TR,AE,GB,US,UY,UZ,VN,DZ,AO,AZ,BS,BD,BJ,BT,BW,BN,GA,KZ,LA,MC,MZ,NE,PK,SM,TW"

export const CONFIG = {
  ENVIRONMENT: process.env.VERCEL_ENV || process.env.NUXT_PUBLIC_VERCEL_ENV || "development",
  BASE_URL: process.env.NUXT_PUBLIC_API_URL || "http://127.0.0.1:8000",
  LOGIN_PATH: process.env.NUXT_PUBLIC_LOGIN_PATH || "/login",
  GITHUB_APP_NAMESPACE: process.env.NUXT_PUBLIC_GITHUB_APP_NAMESPACE || "polar-sh",
  LOCALSTORAGE_PERSIST_KEY: process.env.NUXT_PUBLIC_LOCALSTORAGE_PERSIST_KEY || "polar",
  LOCALSTORAGE_PERSIST_VERSION: stringToNumber(process.env.NUXT_PUBLIC_LOCALSTORAGE_PERSIST_VERSION, 5),
  GITHUB_BADGE_EMBED_DEFAULT_LABEL: process.env.NUXT_PUBLIC_GITHUB_BADGE_EMBED_DEFAULT_LABEL || "Fund",
  SENTRY_DSN: process.env.NUXT_PUBLIC_SENTRY_DSN || undefined,
  POSTHOG_TOKEN: process.env.NUXT_PUBLIC_POSTHOG_TOKEN || "",
  STRIPE_COUNTRIES_WHITELIST_CSV: process.env.NUXT_PUBLIC_STRIPE_COUNTRIES_WHITELIST || STRIPE_COUNTRIES,
  APPLE_DOMAIN_ASSOCIATION:
    process.env.NUXT_PUBLIC_APPLE_DOMAIN_ASSOCIATION || "<Replace with Apple Pay Domain Association from Stripe>",
  GITHUB_INSTALLATION_URL:
    `https://github.com/apps/${process.env.NUXT_PUBLIC_GITHUB_APP_NAMESPACE || "polar-sh"}/installations/new`,
}

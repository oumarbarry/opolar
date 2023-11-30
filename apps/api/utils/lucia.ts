import { lucia } from "lucia"
import { h3 } from "lucia/middleware"
import { pg } from "@lucia-auth/adapter-postgresql"
import { github } from "@lucia-auth/oauth/providers"
import "lucia/polyfill/node"

export const auth = lucia({
  env: process.dev ? "DEV" : "PROD",
  middleware: h3(),
  adapter: pg(pool, { user: "users", key: "keys", session: "sessions" }),
  getUserAttributes: (data) => {
    return {
      githubUsername: data.username,
    }
  },
})

export const githubAuth = github(auth, {
  clientId: process.env.POLAR_GITHUB_CLIENT_ID,
  clientSecret: process.env.POLAR_GITHUB_CLIENT_SECRET,
})

export type Auth = typeof auth

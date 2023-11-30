import { drizzle } from "drizzle-orm/node-postgres"
import postgres from "pg"

export const pool = new postgres.Pool({
  connectionString: process.env.DATABASE_URL,
})

// export const pool = new Pool({
//   host: process.env.POLAR_POSTGRES_HOST,
//   port: Number.parseInt(process.env.POLAR_POSTGRES_PORT),
//   user: process.env.POLAR_POSTGRES_USER,
//   password: process.env.POLAR_POSTGRES_PWD,
//   database: process.env.POLAR_POSTGRES_DATABASE,
// })

export const db = drizzle(pool, { schema: { users, accounts, organizations } })

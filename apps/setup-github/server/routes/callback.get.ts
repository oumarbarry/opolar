import { promises as fs } from "node:fs"
import { z } from "zod"

function addEnv(contents: string, key: string, value: any): string {
  if (contents.includes(key)) {
    const start = contents.indexOf(key)
    const end = contents.indexOf("\n", start)
    return `${contents.substring(0, start)}${key}=${JSON.stringify(value)}${contents.substring(end)}`
  }
  else {
    return `${contents}\n` + `${key}=${JSON.stringify(value)}`
  }
}

interface ServerEnvConfig {
  path: string
  ingressHost: string
  ingressHostProto: string
  app: any

}

async function serverEnv({ path, ingressHost, ingressHostProto, app }: ServerEnvConfig) {
  let file: string = ""

  try {
    file = await fs.readFile(path, "utf8")
  }
  catch {}

  const adds: Record<string, any> = {
    POLAR_POSTGRES_USER: "polar",
    POLAR_POSTGRES_PWD: "polar",
    POLAR_POSTGRES_DATABASE: "polar",
    POLAR_POSTGRES_PORT: "5432",
    POLAR_POSTGRES_HOST: "127.0.0.1",
    POLAR_REDIS_HOST: "127.0.0.1",
    POLAR_REDIS_PORT: "6379",

    POLAR_CORS_ORIGINS: `["http://127.0.0.1:3000", "http://localhost:3000", "https://github.com", "${ingressHostProto}"]`,
    POLAR_BASE_URL: `${ingressHostProto}/api/v1`,
    POLAR_FRONTEND_BASE_URL: `${ingressHostProto}`,
    POLAR_AUTH_COOKIE_DOMAIN: `${ingressHost}`,
    POLAR_GITHUB_REDIRECT_URL: `${ingressHostProto}/github/session`,
  }

  // Add GitHub Env vars
  if (app && app.id) {
    adds.POLAR_GITHUB_APP_IDENTIFIER = app.id
    adds.POLAR_GITHUB_APP_WEBHOOK_SECRET = app.webhook_secret
    adds.POLAR_GITHUB_APP_PRIVATE_KEY = app.pem
    adds.POLAR_GITHUB_CLIENT_ID = app.client_id
    adds.POLAR_GITHUB_CLIENT_SECRET = app.client_secret
  }

  let newFile = file
  for (const [key, value] of Object.entries(adds))
    newFile = addEnv(newFile, key, value)

  return newFile
}

interface WebEnvConfig {
  path: string
  ingressHostProto: string
  app: any
}

async function webEnv({ path, ingressHostProto, app }: WebEnvConfig) {
  let file: string = ""
  try {
    file = await fs.readFile(path, "utf8")
  }
  catch {}

  const adds: Record<string, any> = { NUXT_PUBLIC_API_URL: `${ingressHostProto}` }

  if (app && app.id) adds.NUXT_PUBLIC_GITHUB_APP_NAMESPACE = app.slug

  let newFile = file
  for (const [key, value] of Object.entries(adds))
    newFile = addEnv(newFile, key, value)

  return newFile
}

export default defineEventHandler(async (event) => {
  const { public: { codespaceName, githubCodespacesPortForwardingDomain } } = useRuntimeConfig()

  const host = `${codespaceName}.${githubCodespacesPortForwardingDomain}`
  const hostProto = `https://${host}`
  const ingressHost = `${codespaceName}-8080.${githubCodespacesPortForwardingDomain}`
  const ingressHostProto = `https://${ingressHost}`

  const { code } = await getValidatedQuery(event, z.object({ code: z.string() }).parse)

  try {
    let parsed: any

    if (code) {
      parsed = await $fetch<any>(`https://api.github.com/app-manifests/${code}/conversions`, { method: "POST" })

      if (!parsed.id) throw new Error(`unexpected response from github: ${JSON.stringify(parsed)}`)
    }

    // Server .env
    const serverEnvPath = `${process.cwd()}/../../../server/.env`
    const newServerEnv = await serverEnv({
      path: serverEnvPath,
      ingressHost,
      ingressHostProto,
      app: parsed,
    })
    await fs.writeFile(serverEnvPath, newServerEnv)

    // Web .env
    const webEnvPath = `${process.cwd()}/../../../clients/apps/web/.env`
    const newWebEnv = await webEnv({
      path: webEnvPath,
      ingressHostProto,
      app: parsed,
    })
    await fs.writeFile(webEnvPath, newWebEnv)

    return sendRedirect(event, `${hostProto}:3001/done`)
  }
  catch (e) {
    console.error(e)
    if (e instanceof Error) return { res: e.message }

    return { res: "something went wrong" }
  }
})

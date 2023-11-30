import { Configuration, PolarAPI } from "@polar-sh/sdk"

export function getServerURL(path?: string): string {
  path = path !== undefined ? path : ""
  const baseURL = process.env.NUXT_PUBLIC_API_URL
  const baseWithPath = `${baseURL}${path}`
  return baseWithPath
}

export const api = new PolarAPI(
  new Configuration({
    basePath: getServerURL(),
    credentials: "include",
  }),
)

export function buildAPI(opts: { token?: string }) {
  return new PolarAPI(
    new Configuration({
      basePath: getServerURL(),
      credentials: "include",
      accessToken: opts?.token,
    }),
  )
}

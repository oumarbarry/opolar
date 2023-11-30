export default defineAppConfig({
  polarkit: {
    name: 'Hello from PolarKit'
  }
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    polarkit?: {
      /** Project name */
      name?: string
    }
  }
}

export default defineNitroConfig({
  routeRules: {
    "/api/**": { cors: true },
  },

  imports: {
    dirs: [
      "./composables/**",
      "./db/**",
    ],
    imports: [
      { from: "zod", name: "z" },
    ],
  },

  moduleSideEffects: ["lucia/polyfill/node"],
})

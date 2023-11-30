export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: { shim: false },

  vue: { propsDestructure: true },

  modules: [
    "@nuxtjs/tailwindcss",
    // "@hebilicious/vue-query-nuxt",
  ],

  imports: { dirs: ["./utils/**"] },

  // hooks: {
  //   "components:dirs": (dirs) => {
  //     dirs.unshift({
  //       path: "~/components/ui",
  //       extensions: [".vue"],
  //       prefix: "N",
  //       pathPrefix: false,
  //     })
  //   },
  // },

  // vueQuery: {
  //   queryClientOptions: {
  //     defaultOptions: {
  //       queries: {
  //         staleTime: 60 * 1000,
  //         gcTime: 1000 * 60 * 60, // 1 hour
  //       },
  //     },
  //   },
  // },
})

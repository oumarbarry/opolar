export default defineNuxtConfig({
  extends: ["../../packages/polarkit"],

  devtools: { enabled: true },
  typescript: { shim: false },

  experimental: { typedPages: true },

  modules: [
    "@nuxt/ui",
    "@vueuse/nuxt",
    // "@nuxt/image",
    // "@nuxtjs/storybook",
  ],

  // image: { domains: ["avatars.githubusercontent.com"] },
})

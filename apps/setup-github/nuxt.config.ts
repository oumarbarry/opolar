export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: { shim: true },

  app: {
    pageTransition: false,
    layoutTransition: false,
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
  ],

  googleFonts: {
    subsets: ["latin"],
    families: {
      Inter: true,
    },
  },

  runtimeConfig: {
    public: {
      codespaceName: "",
      githubCodespacesPortForwardingDomain: "",
    },
  },
})

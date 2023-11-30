import { defineConfig } from "vitepress"

export default defineConfig({
  title: "Polar",
  description: "Polar is a platform for open source maintainers to get better funding.",

  lastUpdated: true,
  cleanUrls: true,

  head: [
    ["link", { rel: "icon", type: "image/png", href: "/favicon.png" }],
  ],

  themeConfig: {
    siteTitle: false,
    logo: { light: "/polar-logo-blue.svg", dark: "/polar-logo-white.svg" },

    sidebar: [
      {
        text: "Polar",
        items: [
          { text: "Documentation", link: "/" },
          { text: "API", link: "/api" },
          { text: "GitHub Action", link: "/github-action" },
        ],
      },
    ],

    outline: {
      level: "deep",
      label: "Table of contents",
    },

    search: { provider: "local" },

    socialLinks: [
      { icon: "github", link: "https://github.com/polarsource/polar" },
      { icon: "x", link: "https://twitter.com/@polar_sh" },
    ],
  },
})

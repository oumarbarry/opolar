import antfu from "@antfu/eslint-config"

export default await antfu({
  overrides: {
    vue: {
      "vue/no-setup-props-destructure": 0,
    },
  },
  stylistic: { quotes: "double" },
  rules: {
    "no-console": 0,
    "antfu/if-newline": 0,
    "node/prefer-global/process": 0,
  },
})

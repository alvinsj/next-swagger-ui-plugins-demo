module.exports = {
  extends: ["next", "turbo", "prettier", "eslint:recommended"],
  plugins: ["jest"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "@next/next/no-img-element": "off",
    "semi": ["error", "never"]
  }, 
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
  ignorePatterns: ["dist/", "**/*.json"],
  env: {
    "jest/globals": true,
    es6: true
  }
}

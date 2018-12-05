module.exports = {
  globals: {
    _: false
  },
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "comma-dangle": ["error", "only-multiline"]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
}

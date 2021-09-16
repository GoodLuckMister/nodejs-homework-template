module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'standard',
    "plugin:json/recommended",
    "plugin:jest/recommended",
    'prettier'],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
  },
}

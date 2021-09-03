module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  plugins: [
    "@babel/plugin-proposal-private-methods",
  ],
  extends: [
    'standard',
    "plugin:json/recommended",
    "plugin:jest/recommended",
    'prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
  },
}

module.exports = {
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};

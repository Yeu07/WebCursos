export default {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  languageOptions: {
    globals: {
      node: true,
      es6: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
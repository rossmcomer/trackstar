/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: '2021',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    eqeqeq: 'error',
    'no-console': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'import/extensions': 'off',
    'import/name': 'off',
    'import/prefer-default-export': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': 'off',
    'no-shadow': 'off',
    'object-shorthand': 'off',
    'vue/require-v-for-key': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};

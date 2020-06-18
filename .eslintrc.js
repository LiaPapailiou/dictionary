module.exports = {
  env: {
    node: true,
    browser: true,
  },
  plugins: [
    'mocha',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
  },
  extends: [
    'airbnb-base',
  ],
  rules: {
    'linebreak-style': ['error', 'windows'],
  },
};

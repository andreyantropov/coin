//eslint-disable-next-line no-undef
module.exports = {
  root: true,
  extends: ["airbnb-base", "prettier", "plugin:jest/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  env: {
    browser: true,
  },
  rules: {
    "no-alert": 0,
    "no-param-reassign": [2, { props: false }],
    "no-plusplus": 0,
    "no-iterator": 0,
    "no-restricted-syntax": [2, "WithStatement"],
    "func-style": 0,
    "prettier/prettier": "error",
  },
  plugins: ["prettier", "jest"],
};

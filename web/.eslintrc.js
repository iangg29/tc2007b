module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "plugin:react/recommended",
    "standard-with-typescript",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  globals: {
    React: true,
    JSX: true,
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
  plugins: ["react", "notice"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "notice/notice": [
      "error",
      {
        mustMatch: "\\(c\\) Tecnologico de Monterrey [0-9]{0,4}, rights reserved.",
        template: "// (c) Tecnologico de Monterrey <%= YEAR %>, rights reserved.\n\n",
        messages: {
          whenFailedToMatch: "Couldn't find 'Copyright notice', are you sure you added it?",
        },
      },
    ],
  },
};

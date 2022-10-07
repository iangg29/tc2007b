// (c) Tecnologico de Monterrey 2022, rights reserved.

module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
  },
  testRegex: "((\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  "moduleNameMapper": { "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
   "<rootDir>/assetsTransformer.js", "\\.(css|less)$": "<rootDir>/assetsTransformer.js" }

};

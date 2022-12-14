// (c) Tecnologico de Monterrey 2022, rights reserved.

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["nativewind/babel", "relay", ["module:react-native-dotenv", {
      "moduleName": "@env",
      "path": ".env",
      "blacklist": null,
      "whitelist": null,
      "safe": false,
      "allowUndefined": true
    }]]
  };
};

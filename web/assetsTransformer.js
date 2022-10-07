// (c) Tecnologico de Monterrey 2022, rights reserved.

const path = require("path");

module.exports = {
  process(src, filename, config, options) {
    return "module.exports = " + JSON.stringify(path.basename(filename)) + ";";
  },
};

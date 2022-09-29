// (c) Tecnologico de Monterrey 2022, rights reserved.

const path = require("path");
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const TIMEZONE = "America/Mexico_City";

const builder = {
  migrations: {
    tableName: "app_migrations",
    directory: path.resolve(__dirname, "source", "database", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "source", "database", "seeds"),
  },
};

const defaults = {
  client: "mysql",
  connection: {
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    timezone: TIMEZONE,
  },
  ssl: {
    ca: process.env.DB_CACERT,
  },
  ...builder,
};

module.exports = {
  local: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "source", "database", "dev.sqlite3"),
      timezone: TIMEZONE,
    },
    debug: true,
    useNullAsDefault: true,
    ...builder,
  },

  development: {
    ...defaults,
    debug: true,
  },

  production: {
    ...defaults,
    debug: false,
  },
};

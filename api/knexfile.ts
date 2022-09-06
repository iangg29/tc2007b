// (c) Tecnologico de Monterrey 2022, rights reserved.

const path = require("path");
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const MIN_POOLS = 2;
const MAX_POOLS = 10;
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
  client: "postgresql",
  connection: {
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    timezone: TIMEZONE,
  },
  pool: {
    min: MIN_POOLS,
    max: MAX_POOLS,
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

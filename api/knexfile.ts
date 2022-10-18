// (c) Tecnologico de Monterrey 2022, rights reserved.

import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "./.env") });

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const TIMEZONE = "America/Mexico_City";

const builder = {
  migrations: {
    tableName: "app_migrations",
    directory: resolve(__dirname, "source", "database", "migrations"),
  },
  seeds: {
    directory: resolve(__dirname, "source", "database", "seeds"),
  },
};

const defaults = {
  client: "mssql",
  connection: {
    server: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      encrypt:  true,
    },
  },
  ...builder,
};

module.exports = {
  local: {
    client: "sqlite3",
    connection: {
      filename: resolve(__dirname, "source", "database", "dev.sqlite3"),
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

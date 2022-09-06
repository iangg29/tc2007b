// (c) Tecnologico de Monterrey 2022, rights reserved.

import type { Knex } from "knex";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

console.dir(process.env);

const MIN_POOLS = 2;
const MAX_POOLS = 10;
const TIMEZONE: string = "America/Mexico_City";

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
  migrations: {
    tableName: "app_migrations",
    directory: path.resolve(__dirname, "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "seeds"),
  },
};

const config: { [key: string]: Knex.Config } = {
  local: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "dev.sqlite3"),
      timezone: TIMEZONE,
    },
    debug: true,
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "seeds"),
    },
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

export default config;

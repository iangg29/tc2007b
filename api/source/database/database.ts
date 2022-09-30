// (c) Tecnologico de Monterrey 2022, rights reserved.

import knex, { Knex } from "knex";
import { attachPaginate } from "knex-paginate";
import path from "path";
import Config = Knex.Config;

attachPaginate();
const TIMEZONE: string = "America/Mexico_City";
/**
 * Generate connection details for PG connection.
 */
export const getConnectionConfig = () => {
  if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development") {
    return {
      client: "mysql",
      connection: {
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
        timezone: TIMEZONE,
      },
      ssl: {
        ca: process.env.DB_CACERT,
      },
      debug: process.env.NODE_ENV === "development",
    };
  } else {
    return {
      client: "sqlite3",
      connection: {
        filename: path.resolve(__dirname, "dev.sqlite3"),
        timezone: TIMEZONE,
      },
      debug: true,
      useNullAsDefault: true,
      migrations: {
        tableName: "app_migrations",
        directory: path.resolve(__dirname, "source", "database", "migrations"),
      },
      seeds: {
        directory: path.resolve(__dirname, "source", "database", "seeds"),
      },
    };
  }
};
export const db = knex(getConnectionConfig() as Config);

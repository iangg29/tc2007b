// (c) Tecnologico de Monterrey 2022, rights reserved.

import knex, { Knex } from "knex";
import { attachPaginate } from "knex-paginate";
import Config = Knex.Config;

attachPaginate();

const TIMEZONE: string = "America/Mexico_City";

/**
 * Generate connection details for PG connection.
 */
export const getConnectionConfig = () => {
  if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development") {
    return {
      connection: {
        host: process.env.PG_HOST,
        port: process.env.PG_PORT as string,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
        timezone: TIMEZONE,
      },
      ssl: {
        require: true,
        rejectUnauthorized: false,
        ca: process.env.PG_CA_CERTIFICATE,
      },
      debug: process.env.NODE_ENV === "development",
    };
  } else {
    return {
      connection: {
        connectionString: process.env.PG_CONNECTION_STRING,
        timezone: TIMEZONE,
      },
      ssl: false,
      debug: true,
    };
  }
};

export const db = knex({
  client: "pg",
  ...getConnectionConfig(),
  searchPath: ["knex", "public"],
} as Config);

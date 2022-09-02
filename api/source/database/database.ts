// (c) Tecnologico de Monterrey 2022, rights reserved.

const knex = require("knex");
const { attachPaginate } = require("knex-paginate");

attachPaginate();

export const getConnectionConfig = () => {
  if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development") {
    return {
      connection: {
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
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
      connection: process.env.PG_CONNECTION_STRING,
      ssl: false,
      debug: true,
    };
  }
};

export const db = knex({
  client: "pg",
  ...getConnectionConfig(),
  searchPath: ["knex", "public"],
});

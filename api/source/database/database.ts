// (c) Tecnologico de Monterrey 2022, rights reserved.

const knex = require("knex");
const { attachPaginate } = require("knex-paginate");

attachPaginate();

const getConnectionConfig = () => {
  if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development") {
    return {
      connectString: process.env.PG_CONNECTION_STRING,
      ssl: {
        require: true,
        rejectUnauthorized: true,
        ca: process.env.PG_CA_CERTIFICATE,
      },
      debug: false,
    };
  } else {
    return {
      connectString: process.env.PG_CONNECTION_STRING,
      ssl: false,
      debug: true,
    };
  }
};

export const db = knex({
  client: "pg",
  connection: getConnectionConfig(),
  searchPath: ["knex", "public"],
});

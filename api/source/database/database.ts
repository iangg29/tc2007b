// (c) Tecnologico de Monterrey 2022, rights reserved.

const knex = require("knex");
const { attachPaginate } = require("knex-paginate");

attachPaginate();

export const db = knex({
  client: "pg",
  connection: {
    connectString: process.env.PG_CONNECTION_STRING,
    ssl: process.env.NODE_ENV === "production",
  },
  searchPath: ["knex", "public"],
});

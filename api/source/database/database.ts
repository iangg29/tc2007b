// (c) Tecnologico de Monterrey 2022, rights reserved.

const knex = require("knex");
const { attachPaginate } = require("knex-paginate");

attachPaginate();

const db = knex({
  client: "pg",
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ["knex", "public"],
});

module.exports = db;

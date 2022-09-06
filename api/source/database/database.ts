// (c) Tecnologico de Monterrey 2022, rights reserved.

import { attachPaginate } from "knex-paginate";
import databaseConfig from "./databaseConfig";

attachPaginate();

const env: string = process.env.NODE_ENV || "local";
const db = require("knex")(databaseConfig[env]);
export default db;

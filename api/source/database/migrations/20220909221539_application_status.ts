// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Knex } from "knex";
import { APPLICATION_STATUS_TABLE_NAME } from "../utils/database_constants";
import CreateTableBuilder = Knex.CreateTableBuilder;

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable(APPLICATION_STATUS_TABLE_NAME))) {
    await knex.schema.createTable(APPLICATION_STATUS_TABLE_NAME, (table: CreateTableBuilder) => {
      table.string("id").primary().unique();
      table.string("name").notNullable();
      table.integer("order").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable(APPLICATION_STATUS_TABLE_NAME);
}

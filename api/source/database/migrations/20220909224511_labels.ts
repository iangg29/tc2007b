// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Knex } from "knex";
import { LABEL_TABLE_NAME } from "../utils/database_constants";
import CreateTableBuilder = Knex.CreateTableBuilder;

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable(LABEL_TABLE_NAME))) {
    await knex.schema.createTable(LABEL_TABLE_NAME, (table: CreateTableBuilder) => {
      table.string("id").primary().unique();
      table.string("name").notNullable();
      table.text("description").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable(LABEL_TABLE_NAME);
}

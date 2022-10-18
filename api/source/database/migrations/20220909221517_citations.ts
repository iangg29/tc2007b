// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Knex } from "knex";
import { CITATION_TABLE_NAME } from "../utils/database_constants";
import CreateTableBuilder = Knex.CreateTableBuilder;

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable(CITATION_TABLE_NAME))) {
    await knex.schema.createTable(CITATION_TABLE_NAME, (table: CreateTableBuilder) => {
      // COLUMNS
      table.string("id").primary().unique();
      table.string("citation_title").notNullable();
      table.text("citation_description").notNullable();
      table.text("citation_document").defaultTo("");
      table.text("image");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.timestamp("end_date").notNullable();
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable(CITATION_TABLE_NAME);
}

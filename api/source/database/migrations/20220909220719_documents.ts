// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Knex } from "knex";
import { DOCUMENT_TABLE_NAME, DOCUMENT_TYPE_TABLE_NAME, USER_TABLE_NAME } from "../utils/database_constants";
import CreateTableBuilder = Knex.CreateTableBuilder;

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable(DOCUMENT_TABLE_NAME))) {
    await knex.schema.createTable(DOCUMENT_TABLE_NAME, (table: CreateTableBuilder) => {
      // COLUMNS
      table.string("id").unique();
      table.string("user_id").notNullable();
      table.string("file_name").notNullable();
      table.string("file_type_id").notNullable();
      table.string("url").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());

      table.primary(["id", "user_id", "file_type_id"]);
      // RELATIONSHIPS
      table.foreign("user_id").references("id").inTable(USER_TABLE_NAME).onUpdate("CASCADE").onDelete("CASCADE");
      table
        .foreign("file_type_id", "id")
        .references("id")
        .inTable(DOCUMENT_TYPE_TABLE_NAME)
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable(DOCUMENT_TABLE_NAME);
}

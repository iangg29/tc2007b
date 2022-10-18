// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Knex } from "knex";
import {
  CITATION_DOCUMENTS_TABLE_NAME,
  CITATION_TABLE_NAME,
  DOCUMENT_TYPE_TABLE_NAME,
} from "../utils/database_constants";
import CreateTableBuilder = Knex.CreateTableBuilder;

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable(CITATION_DOCUMENTS_TABLE_NAME))) {
    await knex.schema.createTable(CITATION_DOCUMENTS_TABLE_NAME, (table: CreateTableBuilder) => {
      // COLUMNS
      table.string("citation_id").notNullable;
      table.string("document_type_id").notNullable;
      // RELATIONSHIPS
      table
        .foreign("citation_id")
        .references("id")
        .inTable(CITATION_TABLE_NAME)
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table
        .foreign("document_type_id")
        .references("id")
        .inTable(DOCUMENT_TYPE_TABLE_NAME)
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable(CITATION_DOCUMENTS_TABLE_NAME);
}

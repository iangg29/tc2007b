// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Knex } from "knex";
import { APPLICATION_LABEL_TABLE_NAME, APPLICATION_TABLE_NAME, LABEL_TABLE_NAME } from "../utils/database_constants";
import CreateTableBuilder = Knex.CreateTableBuilder;

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable(APPLICATION_LABEL_TABLE_NAME))) {
    await knex.schema.createTable(APPLICATION_LABEL_TABLE_NAME, (table: CreateTableBuilder) => {
      // COLUMNS
      table.increments("id").primary().unsigned();
      table.string("application_id").notNullable();
      table.string("label_id").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      // RELATIONSHIPS
      table.foreign("application_id").references(`${APPLICATION_TABLE_NAME}.id`).deferrable("deferred");
      table.foreign("label_id").references(`${LABEL_TABLE_NAME}.id`).deferrable("deferred");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable(APPLICATION_LABEL_TABLE_NAME);
}

// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Knex } from "knex";
import {
  APPLICATION_STATUS_TABLE_NAME,
  APPLICATION_TABLE_NAME,
  CITATION_TABLE_NAME,
  USER_TABLE_NAME,
} from "../utils/database_constants";
import CreateTableBuilder = Knex.CreateTableBuilder;

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable(APPLICATION_TABLE_NAME))) {
    await knex.schema.createTable(APPLICATION_TABLE_NAME, (table: CreateTableBuilder) => {
      // COLUMNS
      table.string("id").primary().unique();
      table.string("user_id").notNullable();
      table.string("application_title").notNullable();
      table.string("image").notNullable();
      table.string("application_description").notNullable();
      table.string("support").notNullable();
      table.date("deadline");
      table.timestamp("start_time").defaultTo(knex.fn.now());
      table.timestamp("end_time");
      table.timestamp("emission_date").defaultTo(knex.fn.now());
      table.date("response_date");
      table.string("application_status_id").notNullable();
      table.string("citation_id").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      // RELATIONSHIPS
      table.foreign("user_id").references("id").inTable(USER_TABLE_NAME).onUpdate("CASCADE").onDelete("CASCADE");
      table
        .foreign("application_status_id")
        .references("id")
        .inTable(APPLICATION_STATUS_TABLE_NAME)
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("citation_id")
        .references("id")
        .inTable(CITATION_TABLE_NAME)
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable(APPLICATION_TABLE_NAME);
}

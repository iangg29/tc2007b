// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Knex } from "knex";
import { ROLE_TABLE_NAME, USER_TABLE_NAME } from "../utils/database_constants";
import CreateTableBuilder = Knex.CreateTableBuilder;

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable(USER_TABLE_NAME))) {
    await knex.schema.createTable(USER_TABLE_NAME, (table: CreateTableBuilder) => {
      // COLUMNS
      table.string("id").primary().unique();
      table.string("role_id").notNullable();
      table.string("name").notNullable();
      table.string("first_lastname").notNullable();
      table.string("second_lastname").notNullable();
      table.string("password").notNullable();
      table.string("cellphone").notNullable();
      table.string("email").notNullable().unique();
      table.enum("gender", ["male", "female", "undefined"]).defaultTo("undefined");
      table.tinyint("status", 1).defaultTo(0);
      table.boolean("active").defaultTo(true);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      // RELATIONSHIPS
      table.foreign("role_id").references(`${ROLE_TABLE_NAME}.id`).deferrable("deferred");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable(USER_TABLE_NAME);
}

import { Knex } from "knex";
import { APPLICATION_TABLE_NAME, DOCUMENT_TABLE_NAME, EVIDENCE_TABLE_NAME } from "../utils/database_constants";
import CreateTableBuilder = Knex.CreateTableBuilder;

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable(EVIDENCE_TABLE_NAME))) {
    await knex.schema.createTable(EVIDENCE_TABLE_NAME, (table: CreateTableBuilder) => {
      // COLUMNS
      table.string("id").primary().unique();
      table.string("application_id").notNullable();
      table.string("name").notNullable();
      table.text("description").notNullable();
      table.string("document_id").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      // RELATIONSHIPS
      table.foreign("application_id").references(`${APPLICATION_TABLE_NAME}.id`).deferrable("deferred");
      table.foreign("document_id").references(`${DOCUMENT_TABLE_NAME}.id`).deferrable("deferred");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable(EVIDENCE_TABLE_NAME);
}

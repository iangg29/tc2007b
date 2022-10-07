import { Knex } from "knex";
import { APPLICATION_DOCUMENTS_TABLE_NAME } from "../utils/database_constants";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(APPLICATION_DOCUMENTS_TABLE_NAME).del();

  // Inserts seed entries
  await knex(APPLICATION_DOCUMENTS_TABLE_NAME).insert([
    { id: "1", application_id: "1", document_id: "2" },
    { id: "2", application_id: "2", document_id: "3" },
    { id: "3", application_id: "3", document_id: "2" },
  ]);
}

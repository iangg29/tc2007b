import { Knex } from "knex";
import { CITATION_DOCUMENTS_TABLE_NAME } from "../utils/database_constants";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(CITATION_DOCUMENTS_TABLE_NAME).del();

  // Inserts seed entries
  await knex(CITATION_DOCUMENTS_TABLE_NAME).insert([
    { citation_id: "1", document_type_id: "4" },
    { citation_id: "1", document_type_id: "2" },
    { citation_id: "1", document_type_id: "3" },
    { citation_id: "2", document_type_id: "4" },
    { citation_id: "2", document_type_id: "2" },
    { citation_id: "2", document_type_id: "3" },
    { citation_id: "3", document_type_id: "4" },
    { citation_id: "3", document_type_id: "2" },
    { citation_id: "3", document_type_id: "3" },
  ]);
}

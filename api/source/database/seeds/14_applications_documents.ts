// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Knex } from "knex";
import { APPLICATION_DOCUMENTS_TABLE_NAME } from "../utils/database_constants";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(APPLICATION_DOCUMENTS_TABLE_NAME).del();

  // Inserts seed entries
  await knex(APPLICATION_DOCUMENTS_TABLE_NAME).insert([
    { id: "501", application_id: "1", document_id: "1101" },
    { id: "502", application_id: "1", document_id: "1102" },

    { id: "511", application_id: "2", document_id: "1121" },
    { id: "512", application_id: "2", document_id: "1122" },

    { id: "521", application_id: "3", document_id: "1131" },
    { id: "522", application_id: "3", document_id: "1132" },

    { id: "508", application_id: "1", document_id: "4" },
    { id: "509", application_id: "3", document_id: "2" },
  ]);
}

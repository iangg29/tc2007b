// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Knex } from "knex";
import { APPLICATION_LABEL_TABLE_NAME } from "../utils/database_constants";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(APPLICATION_LABEL_TABLE_NAME).del();

  // Inserts seed entries
  await knex(APPLICATION_LABEL_TABLE_NAME).insert([
    { id: "1", application_id: "1", label_id: "1" },
    { id: "2", application_id: "2", label_id: "3" },
    { id: "3", application_id: "2", label_id: "2" },
    { id: "4", application_id: "3", label_id: "3" },
  ]);
}

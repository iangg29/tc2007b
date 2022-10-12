// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Knex } from "knex";
import { CITATION_TABLE_NAME } from "../utils/database_constants";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(CITATION_TABLE_NAME).del();

  // Inserts seed entries
  await knex(CITATION_TABLE_NAME).insert([
    { id: "1", title: "example 1", description: "description 1", end_date: "2024-12-30 00:00:00" },
    { id: "2", title: "example 2", description: "description 2", end_date: "2024-12-30 00:00:00" },
    { id: "3", title: "example 3", description: "description 3", end_date: "2024-12-30 00:00:00" },
  ]);
}

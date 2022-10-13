// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Knex } from "knex";
import { CITATION_TABLE_NAME } from "../utils/database_constants";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(CITATION_TABLE_NAME).del();

  // Inserts seed entries
  await knex(CITATION_TABLE_NAME).insert([
    { id: "1", title: "La cultura esta en nosotros", description: "description 1", end_date: "2024-12-30 00:00:00" },
    { id: "2", title: "Pintando Querétaro", description: "description 2", end_date: "2024-12-30 00:00:00" },
    { id: "3", title: "QueretaRock", description: "description 3", end_date: "2024-12-30 00:00:00" },
    { id: "4", title: "Invierno 2020", description: "description 3", end_date: "2020-12-30 00:00:00" },
  ]);
}

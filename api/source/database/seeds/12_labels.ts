// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Knex } from "knex";
import { LABEL_TABLE_NAME } from "../utils/database_constants";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(LABEL_TABLE_NAME).del();

  // Inserts seed entries
  await knex(LABEL_TABLE_NAME).insert([
    { id: "1", label_name: "pintura", description: "example1" },
    { id: "2", label_name: "óleo", description: "example2" },
    { id: "3", label_name: "escultura", description: "example3" },
  ]);
}

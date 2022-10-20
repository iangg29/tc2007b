// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Knex } from "knex";
import { LABEL_TABLE_NAME } from "../utils/database_constants";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(LABEL_TABLE_NAME).del();

  // Inserts seed entries
  await knex(LABEL_TABLE_NAME).insert([
    { id: "1", label_name: "Pintura", description: "Proyectos relacionados con pintura" },
    { id: "2", label_name: "Danza", description: "Proyectos relacionados con danza" },
    { id: "3", label_name: "Musica", description: "Proyectos relacionados con música" },
  ]);
}

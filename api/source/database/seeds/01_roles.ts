// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Knex } from "knex";
import { ROLE_TABLE_NAME } from "../utils/database_constants";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(ROLE_TABLE_NAME).del();

  // Inserts seed entries
  await knex(ROLE_TABLE_NAME).insert([
    { id: "1", name: "administrator", description: "Rol usuario del webapp", default: false },
    { id: "2", name: "artist", description: "Rol usuario del app mobile", default: true },
  ]);
}

// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Knex } from "knex";
import { ROLE_TABLE_NAME } from "../utils/database_constants";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(ROLE_TABLE_NAME).del();

  // Inserts seed entries
  await knex(ROLE_TABLE_NAME).insert([
    {
      id: "1",
      name: "administrador",
      description: "Usuario que administra las convocatorias y revisa las solicitudes",
      default: false,
    },
    {
      id: "2",
      name: "solicitante",
      description: "Usuario que envía una solicitud a una convocatoria activa",
      default: true,
    },
  ]);
}

import { Knex } from "knex";
import { DOCUMENT_TABLE_NAME } from "../utils/database_constants";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(DOCUMENT_TABLE_NAME).del();

  // table.string("id").primary().unique();
  // table.string("name").notNullable();

  // Inserts seed entries
  await knex(DOCUMENT_TABLE_NAME).insert([
    { id: "1", name: "CURP" },
    { id: "2", name: "INE" },
    { id: "3", name: "RFC" },
    { id: "4", name: "Acta de Nacimiento" },
    { id: "5", name: "Convocatoria" },
    { id: "6", name: "Formulario" },
  ]);
}

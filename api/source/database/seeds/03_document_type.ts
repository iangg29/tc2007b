import { Knex } from "knex";
import { DOCUMENT_TYPE_TABLE_NAME } from "../utils/database_constants";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(DOCUMENT_TYPE_TABLE_NAME).del();

  // Inserts seed entries
  await knex(DOCUMENT_TYPE_TABLE_NAME).insert([
    { id: "1", name: "Convocatoria" },
    { id: "2", name: "INE" },
    { id: "3", name: "RFC" },
    { id: "4", name: "Acta de Nacimiento" },
    { id: "5", name: "CURP" },
    { id: "6", name: "Formulario" },
  ]);
}

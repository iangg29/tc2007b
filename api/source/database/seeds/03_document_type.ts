import { Knex } from "knex";
import { DOCUMENT_TYPE_TABLE_NAME } from "../utils/database_constants";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(DOCUMENT_TYPE_TABLE_NAME).del();

  // Inserts seed entries
  await knex(DOCUMENT_TYPE_TABLE_NAME).insert([
    { id: "1", type_name: "Convocatoria" },
    { id: "2", type_name: "INE" },
    { id: "3", type_name: "RFC" },
    { id: "4", type_name: "Acta de Nacimiento" },
    { id: "5", type_name: "CURP" },
    { id: "6", type_name: "Formulario" },
  ]);
}

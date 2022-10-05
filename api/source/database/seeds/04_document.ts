import { Knex } from "knex";
import { DOCUMENT_TABLE_NAME } from "../utils/database_constants";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(DOCUMENT_TABLE_NAME).del();

  // Inserts seed entries
  await knex(DOCUMENT_TABLE_NAME).insert([
    {
      id: "1",
      user_id: "1",
      file_name: "con1.pdf",
      file_type_id: "1",
      url: "https://www.usebeq.edu.mx/PaginaWEB/Content/USICAMM/CE22-23/CONVOCATORIA%20PROMOCI%C3%93N%20HORIZONTAL%202022%20vf.pdf",
    },
    {
      id: "4",
      user_id: "1",
      file_name: "con2.pdf",
      file_type_id: "1",
      url: "https://www.usebeq.edu.mx/PaginaWEB/Content/USICAMM/CE22-23/CONVOCATORIA%20PROMOCI%C3%93N%20HORIZONTAL%202022%20vf.pdf",
    },
    {
      id: "5",
      user_id: "1",
      file_name: "con3.pdf",
      file_type_id: "1",
      url: "https://www.usebeq.edu.mx/PaginaWEB/Content/USICAMM/CE22-23/CONVOCATORIA%20PROMOCI%C3%93N%20HORIZONTAL%202022%20vf.pdf",
    },
    {
      id: "2",
      user_id: "1",
      file_name: "example2.pdf",
      file_type_id: "2",
      url: "https://www.usebeq.edu.mx/PaginaWEB/Content/USICAMM/CE22-23/CONVOCATORIA%20PROMOCI%C3%93N%20HORIZONTAL%202022%20vf.pdf",
    },
    {
      id: "3",
      user_id: "1",
      file_name: "example3.pdf",
      file_type_id: "3",
      url: "https://www.usebeq.edu.mx/PaginaWEB/Content/USICAMM/CE22-23/CONVOCATORIA%20PROMOCI%C3%93N%20HORIZONTAL%202022%20vf.pdf",
    },
  ]);
}

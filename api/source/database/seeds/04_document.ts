// (c) Tecnologico de Monterrey 2022, rights reserved.

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
      file_name: "con1.pdf",
      file_type_id: "1",
      url: "https://www.usebeq.edu.mx/PaginaWEB/Content/USICAMM/CE22-23/CONVOCATORIA%20PROMOCI%C3%93N%20HORIZONTAL%202022%20vf.pdf",
    },
    {
      id: "2",
      user_id: "3",
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
    {
      id: "101",
      user_id: "1",
      file_name: "Ine_Aris",
      file_type_id: "2",
      url: "https://portalanterior.ine.mx/archivos2/portal/credencial/pdf-credencial/modeloactual2016-ine.pdf",
    },
    {
      id: "102",
      user_id: "2",
      file_name: "Ine_Jordana",
      file_type_id: "2",
      url: "https://portalanterior.ine.mx/archivos2/portal/credencial/pdf-credencial/modeloactual2016-ine.pdf",
    },
    {
      id: "103",
      user_id: "3",
      file_name: "Ine_Karen",
      file_type_id: "2",
      url: "https://portalanterior.ine.mx/archivos2/portal/credencial/pdf-credencial/modeloactual2016-ine.pdf",
    },
    {
      id: "201",
      user_id: "1",
      file_name: "Ine_Aris",
      file_type_id: "4",
      url: "https://www.diputados.gob.mx/documentos/N_Acta_Nacimiento.pdf",
    },
    {
      id: "202",
      user_id: "2",
      file_name: "Ine_Jordana",
      file_type_id: "4",
      url: "https://www.diputados.gob.mx/documentos/N_Acta_Nacimiento.pdf",
    },
    {
      id: "203",
      user_id: "3",
      file_name: "Ine_Karen",
      file_type_id: "4",
      url: "https://www.diputados.gob.mx/documentos/N_Acta_Nacimiento.pdf",
    },

    {
      id: "1101",
      user_id: "f97b0215-ea36-4d8d-a3f1-458e640a21ba",
      file_name: "INE_Hector",
      file_type_id: "2",
      url: "https://www.usebeq.edu.mx/PaginaWEB/Content/USICAMM/CE22-23/CONVOCATORIA%20PROMOCI%C3%93N%20HORIZONTAL%202022%20vf.pdf",
    },
    {
      id: "1102",
      user_id: "f97b0215-ea36-4d8d-a3f1-458e640a21ba",
      file_name: "Acta_Hector",
      file_type_id: "4",
      url: "https://www.diputados.gob.mx/documentos/N_Acta_Nacimiento.pdf",
    },

    {
      id: "1121",
      user_id: "ab150595-11df-4a59-be35-fe09e05427e3",
      file_name: "INE_Mariana",
      file_type_id: "2",
      url: "https://portalanterior.ine.mx/archivos2/portal/credencial/pdf-credencial/modeloactual2016-ine.pdf",
    },
    {
      id: "1122",
      user_id: "ab150595-11df-4a59-be35-fe09e05427e3",
      file_name: "Acta_Mariana",
      file_type_id: "4",
      url: "https://www.diputados.gob.mx/documentos/N_Acta_Nacimiento.pdf",
    },

    {
      id: "1131",
      user_id: "7",
      file_name: "INE_Alfredo",
      file_type_id: "2",
      url: "https://portalanterior.ine.mx/archivos2/portal/credencial/pdf-credencial/modeloactual2016-ine.pdf",
    },
    {
      id: "1132",
      user_id: "7",
      file_name: "Acta_Alfredo",
      file_type_id: "4",
      url: "https://www.diputados.gob.mx/documentos/N_Acta_Nacimiento.pdf",
    },
  ]);
}

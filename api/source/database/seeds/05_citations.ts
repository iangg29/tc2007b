// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Knex } from "knex";
import { CITATION_TABLE_NAME } from "../utils/database_constants";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(CITATION_TABLE_NAME).del();

  // Inserts seed entries
  await knex(CITATION_TABLE_NAME).insert([
    {
      id: "1",
      citation_title: "Cultura para todos",
      image: "",
      end_date: "2024-12-30 00:00:00",
      citation_description: "https://cdn.pixabay.com/photo/2015/11/05/23/02/chichen-itza-1025099_960_720.jpg",
      citation_document: "http://culturaqueretaro.gob.mx/iqca/admin/uploads/convocatorias/f4b4c4cb10c95a9c7112d2c3f94ef20e.pdf",
    },
    {
      id: "2",
      citation_title: "Pintando Querétaro",
      image: "",
      end_date: "2024-12-30 00:00:00",
      citation_description: "https://cdn.pixabay.com/photo/2016/11/29/09/51/day-of-the-dead-1868836_960_720.jpg",
      citation_document: "http://culturaqueretaro.gob.mx/iqca/admin/uploads/convocatorias/f4b4c4cb10c95a9c7112d2c3f94ef20e.pdf",
    },
    {
      id: "3",
      citation_title: "QueretaRock",
      image: "",
      end_date: "2024-12-30 00:00:00",
      citation_description: "https://cdn.pixabay.com/photo/2022/07/21/18/15/queretaro-7336721__340.jpg",
      citation_document: "http://culturaqueretaro.gob.mx/iqca/admin/uploads/convocatorias/f4b4c4cb10c95a9c7112d2c3f94ef20e.pdf",
    },
    {
      id: "4",
      citation_title: "Invierno 2020",
      image: "",
      end_date: "2020-12-30 00:00:00",
      citation_description: "https://cdn.pixabay.com/photo/2021/10/19/17/54/queretaro-6724217__340.jpg",
      citation_document: "http://culturaqueretaro.gob.mx/iqca/admin/uploads/convocatorias/f4b4c4cb10c95a9c7112d2c3f94ef20e.pdf",

    },
  ]);
}

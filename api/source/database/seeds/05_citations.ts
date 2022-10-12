import { Knex } from "knex";
import { CITATION_TABLE_NAME } from "../utils/database_constants";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(CITATION_TABLE_NAME).del();

  // Inserts seed entries
  await knex(CITATION_TABLE_NAME).insert([
    {
      id: "1",
      title: "Cultura para todos",
      image: "",
      end_date: "2024-12-30 00:00:00",
      description: "https://cdn.pixabay.com/photo/2015/11/05/23/02/chichen-itza-1025099_960_720.jpg",
    },
    {
      id: "2",
      title: "Pintando Querétaro",
      image: "",
      end_date: "2024-12-30 00:00:00",
      description: "https://cdn.pixabay.com/photo/2016/11/29/09/51/day-of-the-dead-1868836_960_720.jpg",
    },
    {
      id: "3",
      title: "QueretaRock",
      image: "",
      end_date: "2024-12-30 00:00:00",
      description: "https://cdn.pixabay.com/photo/2022/07/21/18/15/queretaro-7336721__340.jpg",
    },
    {
      id: "4",
      title: "Invierno 2020",
      image: "",
      end_date: "2020-12-30 00:00:00",
      description: "https://cdn.pixabay.com/photo/2021/10/19/17/54/queretaro-6724217__340.jpg",
    },
  ]);
}

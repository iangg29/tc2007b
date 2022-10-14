import { Knex } from "knex";
import { CITATION_TABLE_NAME } from "../utils/database_constants";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(CITATION_TABLE_NAME).del();

  // Inserts seed entries
  await knex(CITATION_TABLE_NAME).insert([
    {
      id: "1",
      title: "example 1",
      description: "description 1",
      image:
        "https://media.istockphoto.com/photos/beautiful-street-of-a-magical-town-in-tequisquiapan-queretaro-mexico-picture-id1324779547?b=1&k=20&m=1324779547&s=170667a&w=0&h=jyivnNd-SJqawj8Bk1k37etWEgMLq1Khkelsjegep-E=",
      end_date: "2024-12-30 00:00:00",
    },
    {
      id: "2",
      title: "example 2",
      description: "description 2",
      image:
        "https://media.istockphoto.com/photos/beautiful-street-of-a-magical-town-in-tequisquiapan-queretaro-mexico-picture-id1324779547?b=1&k=20&m=1324779547&s=170667a&w=0&h=jyivnNd-SJqawj8Bk1k37etWEgMLq1Khkelsjegep-E=",
      end_date: "2024-12-30 00:00:00",
    },
    {
      id: "3",
      title: "example 3",
      description: "description 3",
      image:
        "https://media.istockphoto.com/photos/beautiful-street-of-a-magical-town-in-tequisquiapan-queretaro-mexico-picture-id1324779547?b=1&k=20&m=1324779547&s=170667a&w=0&h=jyivnNd-SJqawj8Bk1k37etWEgMLq1Khkelsjegep-E=",
      end_date: "2024-12-30 00:00:00",
    },
  ]);
}

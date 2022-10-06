import { Knex } from "knex";
import { APPLICATION_TABLE_NAME } from "../utils/database_constants";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(APPLICATION_TABLE_NAME).del();

  // Inserts seed entries
  await knex(APPLICATION_TABLE_NAME).insert([
    {
      id: "1",
      user_id: "1",
      title: "Obra de arte",
      image: "https://www.artistasdelatierra.com/obras/foto104185.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit sapien nisi, eget faucibus magna lobortis eu. Sed arcu nibh, varius eu finibus in, tincidunt nec tellus. Nullam suscipit mi libero, posuere sodales nunc congue quis. Cras rhoncus malesuada posuere. In sed velit at ex tincidunt sodales quis sit amet neque. Duis sodales libero at accumsan convallis. Curabitur feugiat justo a tellus tempor, at egestas ante mattis. Ut sagittis rhoncus iaculis.",
      support:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit sapien nisi, eget faucibus magna lobortis eu. Sed arcu nibh, varius eu finibus in, tincidunt nec tellus. Nullam suscipit mi libero, posuere sodales nunc congue quis. Cras rhoncus malesuada posuere. In sed velit at ex tincidunt sodales quis sit amet neque. Duis sodales libero at accumsan convallis. Curabitur feugiat justo a tellus tempor, at egestas ante mattis. Ut sagittis rhoncus iaculis.",
      application_status_id: "1",
      citation_id: "1",
    },
    {
      id: "2",
      user_id: "2",
      title: "Obra de arte2",
      image: "https://www.artistasdelatierra.com/obras/foto104185.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit sapien nisi, eget faucibus magna lobortis eu. Sed arcu nibh, varius eu finibus in, tincidunt nec tellus. Nullam suscipit mi libero, posuere sodales nunc congue quis. Cras rhoncus malesuada posuere. In sed velit at ex tincidunt sodales quis sit amet neque. Duis sodales libero at accumsan convallis. Curabitur feugiat justo a tellus tempor, at egestas ante mattis. Ut sagittis rhoncus iaculis.",
      support:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit sapien nisi, eget faucibus magna lobortis eu. Sed arcu nibh, varius eu finibus in, tincidunt nec tellus. Nullam suscipit mi libero, posuere sodales nunc congue quis. Cras rhoncus malesuada posuere. In sed velit at ex tincidunt sodales quis sit amet neque. Duis sodales libero at accumsan convallis. Curabitur feugiat justo a tellus tempor, at egestas ante mattis. Ut sagittis rhoncus iaculis.",
      application_status_id: "1",
      citation_id: "1",
    },
    {
      id: "3",
      user_id: "3",
      title: "Obra de arte3",
      image: "https://www.artistasdelatierra.com/obras/foto104185.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit sapien nisi, eget faucibus magna lobortis eu. Sed arcu nibh, varius eu finibus in, tincidunt nec tellus. Nullam suscipit mi libero, posuere sodales nunc congue quis. Cras rhoncus malesuada posuere. In sed velit at ex tincidunt sodales quis sit amet neque. Duis sodales libero at accumsan convallis. Curabitur feugiat justo a tellus tempor, at egestas ante mattis. Ut sagittis rhoncus iaculis.",
      support:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit sapien nisi, eget faucibus magna lobortis eu. Sed arcu nibh, varius eu finibus in, tincidunt nec tellus. Nullam suscipit mi libero, posuere sodales nunc congue quis. Cras rhoncus malesuada posuere. In sed velit at ex tincidunt sodales quis sit amet neque. Duis sodales libero at accumsan convallis. Curabitur feugiat justo a tellus tempor, at egestas ante mattis. Ut sagittis rhoncus iaculis.",
      application_status_id: "1",
      citation_id: "1",
    },
  ]);
}
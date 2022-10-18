// (c) Tecnologico de Monterrey 2022, rights reserved.

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
      application_title: "Financiamiento para obra de arte",
      image: "https://cdn.pixabay.com/photo/2015/07/20/16/22/mexico-853048__340.jpg",
      application_description:
        "Solicito un apoyo por la cantidad de $1,500 pesos para comprar materiales (Pintura, pinceles, acuarelas, cartón y vidrio) para hacer una escultura, misma que será presentada en el centro de la ciudad el día 30 de Noviembre",
      support: "$1,500 pesos",
      application_status_id: "2",
      citation_id: "1",
    },
    {
      id: "2",
      user_id: "2",
      application_title: "La danza de los cisnes",
      image: "https://cdn.pixabay.com/photo/2016/05/06/17/06/ballerinas-1376250__480.jpg",
      application_description:
        "Somos de la compañia de danza DanceTech, el día 28 de Diciembre nos gustaría abrir al público el espetaculo de la danza de los cisnes que hemos ensayado. Para esto solicitamos el teatro de la ciudad.",
      support: "Teatro de la ciudad 28 de Diciembre de 15:00-22:00 hrs",
      application_status_id: "2",
      citation_id: "4",
    },
    {
      id: "3",
      user_id: "3",
      application_title: "Solicitud para auditorio",
      image: "https://www.artistasdelatierra.com/obras/foto104185.jpg",
      application_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit sapien nisi, eget faucibus magna lobortis eu. Sed arcu nibh, varius eu finibus in, tincidunt nec tellus. Nullam suscipit mi libero, posuere sodales nunc congue quis. Cras rhoncus malesuada posuere. In sed velit at ex tincidunt sodales quis sit amet neque. Duis sodales libero at accumsan convallis. Curabitur feugiat justo a tellus tempor, at egestas ante mattis. Ut sagittis rhoncus iaculis.",
      support:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit sapien nisi, eget faucibus magna lobortis eu. Sed arcu nibh, varius eu finibus in, tincidunt nec tellus. Nullam suscipit mi libero, posuere sodales nunc congue quis. Cras rhoncus malesuada posuere. In sed velit at ex tincidunt sodales quis sit amet neque. Duis sodales libero at accumsan convallis. Curabitur feugiat justo a tellus tempor, at egestas ante mattis. Ut sagittis rhoncus iaculis.",
      application_status_id: "2",
      citation_id: "1",
    },

    {
      id: "8",
      user_id: "6",
      application_title: "Solicitud 7",
      image: "https://www.artistasdelatierra.com/obras/foto104185.jpg",
      application_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit sapien nisi, eget faucibus magna lobortis eu. Sed arcu nibh, varius eu finibus in, tincidunt nec tellus. Nullam suscipit mi libero, posuere sodales nunc congue quis. Cras rhoncus malesuada posuere. In sed velit at ex tincidunt sodales quis sit amet neque. Duis sodales libero at accumsan convallis. Curabitur feugiat justo a tellus tempor, at egestas ante mattis. Ut sagittis rhoncus iaculis.",
      support:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit sapien nisi, eget faucibus magna lobortis eu. Sed arcu nibh, varius eu finibus in, tincidunt nec tellus. Nullam suscipit mi libero, posuere sodales nunc congue quis. Cras rhoncus malesuada posuere. In sed velit at ex tincidunt sodales quis sit amet neque. Duis sodales libero at accumsan convallis. Curabitur feugiat justo a tellus tempor, at egestas ante mattis. Ut sagittis rhoncus iaculis.",
      application_status_id: "4",
      citation_id: "1",
    },
    {
      id: "9",
      user_id: "5",
      application_title: "Solicitud 8",
      image: "https://www.artistasdelatierra.com/obras/foto104185.jpg",
      application_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit sapien nisi, eget faucibus magna lobortis eu. Sed arcu nibh, varius eu finibus in, tincidunt nec tellus. Nullam suscipit mi libero, posuere sodales nunc congue quis. Cras rhoncus malesuada posuere. In sed velit at ex tincidunt sodales quis sit amet neque. Duis sodales libero at accumsan convallis. Curabitur feugiat justo a tellus tempor, at egestas ante mattis. Ut sagittis rhoncus iaculis.",
      support:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit sapien nisi, eget faucibus magna lobortis eu. Sed arcu nibh, varius eu finibus in, tincidunt nec tellus. Nullam suscipit mi libero, posuere sodales nunc congue quis. Cras rhoncus malesuada posuere. In sed velit at ex tincidunt sodales quis sit amet neque. Duis sodales libero at accumsan convallis. Curabitur feugiat justo a tellus tempor, at egestas ante mattis. Ut sagittis rhoncus iaculis.",
      application_status_id: "3",
      citation_id: "1",
    },
    {
      id: "10",
      user_id: "4",
      application_title: "Solicitud 9",
      image: "https://cdn.pixabay.com/photo/2022/05/06/03/09/queretaro-7177385__340.jpg",
      application_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit sapien nisi, eget faucibus magna lobortis eu. Sed arcu nibh, varius eu finibus in, tincidunt nec tellus. Nullam suscipit mi libero, posuere sodales nunc congue quis. Cras rhoncus malesuada posuere. In sed velit at ex tincidunt sodales quis sit amet neque. Duis sodales libero at accumsan convallis. Curabitur feugiat justo a tellus tempor, at egestas ante mattis. Ut sagittis rhoncus iaculis.",
      support:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit sapien nisi, eget faucibus magna lobortis eu. Sed arcu nibh, varius eu finibus in, tincidunt nec tellus. Nullam suscipit mi libero, posuere sodales nunc congue quis. Cras rhoncus malesuada posuere. In sed velit at ex tincidunt sodales quis sit amet neque. Duis sodales libero at accumsan convallis. Curabitur feugiat justo a tellus tempor, at egestas ante mattis. Ut sagittis rhoncus iaculis.",
      application_status_id: "5",
      citation_id: "1",
    },
    {
      id: "12",
      user_id: "7",
      application_title: "Solicitud 11",
      image: "https://www.artistasdelatierra.com/obras/foto104185.jpg",
      application_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit sapien nisi, eget faucibus magna lobortis eu. Sed arcu nibh, varius eu finibus in, tincidunt nec tellus. Nullam suscipit mi libero, posuere sodales nunc congue quis. Cras rhoncus malesuada posuere. In sed velit at ex tincidunt sodales quis sit amet neque. Duis sodales libero at accumsan convallis. Curabitur feugiat justo a tellus tempor, at egestas ante mattis. Ut sagittis rhoncus iaculis.",
      support:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit sapien nisi, eget faucibus magna lobortis eu. Sed arcu nibh, varius eu finibus in, tincidunt nec tellus. Nullam suscipit mi libero, posuere sodales nunc congue quis. Cras rhoncus malesuada posuere. In sed velit at ex tincidunt sodales quis sit amet neque. Duis sodales libero at accumsan convallis. Curabitur feugiat justo a tellus tempor, at egestas ante mattis. Ut sagittis rhoncus iaculis.",
      application_status_id: "6",
      citation_id: "1",
    },
  ]);
}

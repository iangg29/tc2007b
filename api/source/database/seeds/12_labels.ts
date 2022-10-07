import { Knex } from "knex";
import { LABEL_TABLE_NAME } from "../utils/database_constants";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(LABEL_TABLE_NAME).del();

  // Inserts seed entries
  await knex(LABEL_TABLE_NAME).insert([
    { id: "1", name: "pintura", description: "example1" },
    { id: "2", name: "óleo", description: "example2" },
    { id: "3", name: "escultura", description: "example3" },
  ]);
}

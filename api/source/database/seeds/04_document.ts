import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("table_name").del();

  // table.string("id").unique();
  //   table.string("user_id").notNullable();
  //   table.string("file_name").notNullable();
  //   table.string("file_type_id").notNullable();
  //   table.string("url").notNullable();

  // Inserts seed entries
  await knex("table_name").insert([
    { id: "1", user_id: "1", file_name: "example.pdf", file_type_id: "1", url: "" },
    { id: "2", user_id: "1", file_name: "example.pdf", file_type_id: "2", url: "" },
    { id: "3", user_id: "1", file_name: "example.pdf", file_type_id: "3", url: "" },
  ]);
}

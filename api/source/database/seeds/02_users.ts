import { Knex } from "knex";
import { USER_TABLE_NAME } from "../utils/database_constants";
import bcrypt from "bcryptjs";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(USER_TABLE_NAME).del();

  const password = await bcrypt.hash("12345678", 12);

  // Inserts seed entries
  await knex(USER_TABLE_NAME).insert([
    {
      id: "1",
      role_id: "1",
      name: "Aris",
      first_lastname: "Aguirre",
      password,
      cellphone: "771 3521 23 32",
      email: "arismoxa@tec.mx",
      gender: "female",
    },
    {
      id: "2",
      role_id: "1",
      name: "Jordana",
      first_lastname: "Betancourt",
      password,
      cellphone: "477 3421 23 32",
      email: "jordys@tec.mx",
      gender: "female",
    },
    {
      id: "3",
      role_id: "1",
      name: "Karen",
      first_lastname: "Lopez",
      password,
      cellphone: "442 3321 23 32",
      email: "karens@tec.mx",
      gender: "female",
    },
    {
      id: "4",
      role_id: "1",
      name: "Alecs",
      first_lastname: "Martiez",
      password,
      cellphone: "55 1321 23 32",
      email: "alecs@tec.mx",
    },
    {
      id: "5",
      role_id: "1",
      name: "Fermin",
      first_lastname: "Mendez",
      password,
      cellphone: "618 4321 23 32",
      email: "fernix@tec.mx",
    },
    {
      id: "6",
      role_id: "1",
      name: "Ian",
      first_lastname: "Garcia",
      password,
      cellphone: "442 6321 23 32",
      email: "ian@tec.mx",
    },
    {
      id: "7",
      role_id: "1",
      name: "Fredy",
      first_lastname: "Huerta",
      password,
      cellphone: "442 7321 23 32",
      email: "fredys@tec.mx",
    },
    {
      id: "8",
      role_id: "1",
      name: "Angel",
      first_lastname: "Rico",
      password,
      cellphone: "461 4321 23 32",
      email: "angel@tec.mx",
    },
  ]);
}

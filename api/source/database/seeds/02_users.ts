// (c) Tecnologico de Monterrey 2022, rights reserved.

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
      second_lastname: "Aguirre",
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
      second_lastname: "Aguirre",
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
      second_lastname: "Aguirre",
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
      second_lastname: "Aguirre",
      password,
      cellphone: "55 1321 23 32",
      email: "alecs@tec.mx",
    },
    {
      id: "5",
      role_id: "1",
      name: "Fermin",
      first_lastname: "Mendez",
      second_lastname: "García",
      password,
      cellphone: "618 4321 23 32",
      email: "fernix@tec.mx",
    },
    {
      id: "6",
      role_id: "1",
      name: "Ian",
      first_lastname: "Garcia",
      second_lastname: "Aguirre",
      password,
      cellphone: "442 6321 23 32",
      email: "ian@tec.mx",
    },
    {
      id: "7",
      role_id: "1",
      name: "Fredy",
      first_lastname: "Huerta",
      second_lastname: "Aguirre",
      password,
      cellphone: "442 7321 23 32",
      email: "fredys@tec.mx",
    },
    {
      id: "8",
      role_id: "1",
      name: "Angel",
      first_lastname: "Rico",
      second_lastname: "Aguirre",
      password,
      cellphone: "461 4321 23 32",
      email: "angel@tec.mx",
    },
    {
      id: "9",
      role_id: "1",
      name: "Verónica",
      first_lastname: "Martínez",
      second_lastname: "Cruz",
      password,
      cellphone: "442 2255 55 32",
      email: "admin@gob.mx",
    },
  ]);
}

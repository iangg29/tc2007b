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
      email: "aris@tec.mx",
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
      email: "jorana@tec.mx",
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
      email: "karen@tec.mx",
      gender: "female",
    },
    {
      id: "4",
      role_id: "1",
      name: "Alex",
      first_lastname: "Martiez",
      second_lastname: "Aguirre",
      password,
      cellphone: "55 1321 23 32",
      email: "alex@tec.mx",
    },
    {
      id: "5",
      role_id: "2",
      name: "Fermin",
      first_lastname: "Mendez",
      second_lastname: "García",
      password,
      cellphone: "618 4321 23 32",
      email: "fermin@tec.mx",
    },
    {
      id: "6",
      role_id: "2",
      name: "Ian",
      first_lastname: "Garcia",
      second_lastname: "Aguirre",
      password,
      cellphone: "442 6321 23 32",
      email: "ian@tec.mx",
    },
    {
      id: "7",
      role_id: "2",
      name: "Alfredo",
      first_lastname: "Huerta",
      second_lastname: "Aguirre",
      password,
      cellphone: "442 7321 23 32",
      email: "alfredo@tec.mx",
    },
    {
      id: "8",
      role_id: "2",
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
      first_lastname: "Gonzalez",
      second_lastname: "Aguirre",
      password,
      cellphone: "442 7321 23 32",
      email: "veronica@gob.mx",
    },
    {
      id: "f97b0215-ea36-4d8d-a3f1-458e640a21ba",
      role_id: "2",
      name: "Hector",
      first_lastname: "Gómez",
      second_lastname: "García",
      password,
      cellphone: "4422216543",
      email: "hector@gmail.com",
    },
    {
      id: "ab150595-11df-4a59-be35-fe09e05427e3",
      role_id: "2",
      name: "Mariana",
      first_lastname: "Zepeda",
      second_lastname: "Puentes",
      password,
      cellphone: "4427981584",
      email: "mariana@gmail.com",
    },
    {
      id: "0eec833a-58c5-4c0a-8a1b-f27995adcdfe",
      role_id: "2",
      name: "Esperanza",
      first_lastname: "Martinez",
      second_lastname: "Saldivar",
      password,
      cellphone: "4423981584",
      email: "esperanzal@tec.mx",
    },
  ]);
}

// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Knex } from "knex";
import { APPLICATION_STATUS_TABLE_NAME } from "../utils/database_constants";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(APPLICATION_STATUS_TABLE_NAME).del();

    // Inserts seed entries
    await knex(APPLICATION_STATUS_TABLE_NAME).insert([
        { id: "1", name:"En corrección", order:0 },
        { id: "2", name:"Pendiente de revisión", order:1 },
        { id: "3", name:"Documentos aceptados", order:2 },
        { id: "4", name:"Rechazado", order:3 },
        { id: "5", name:"Aceptado", order:4 },
        { id: "6", name:"Finalizado", order:5 }
    ]);
}

import { Knex } from "knex";
import { FAQ_TABLE_NAME } from "../utils/database_constants";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(FAQ_TABLE_NAME).del();

    // Inserts seed entries
    await knex(FAQ_TABLE_NAME).insert([
        { id: 1, question: "¿Cómo saber si regresaron mis documentos?", 
        answer: "En el apartado de 'Mis solicitudes' podrá consultar en la parte" +
         " inferior derecha el estatus de su solicitud, estará con el estado" +
         " 'En correción' si alguno de sus documentos es incorrecto o borroso. " },
        { id: 2, question: "¿Cómo saber que documentos ocupo para mi solicitud?", 
        answer: "Podrás consultarlo en el PDF de la convocatoria a la que quieras aplicar" +
    ", además al realizar tu solicitud no te dejará avanzar hasta que subas los documentos necesarios." },
        { id: 3, question: "Si tengo una duda específica que no esté en el ChatBot, ¿A dónde me comunico?",
         answer: "Puede enviar un correo a culturaqro@gob.mx o llamar al 4421232343 en un horario de 8 A.M. a 6 P.M" }
    ]);
};

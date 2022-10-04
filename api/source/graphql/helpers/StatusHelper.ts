// (c) Tecnologico de Monterrey 2022, rights reserved.

import { db } from "../../database/database";
import { APPLICATION_STATUS_TABLE_NAME} from "../../database/utils/database_constants";

const getStatus = async ( id : string) => {
    return await db.select().table(APPLICATION_STATUS_TABLE_NAME).where({ id });
}

export { getStatus };
import { db } from "../../database/database";
import { DOCUMENT_TABLE_NAME } from "../../database/utils/database_constants";

const getDocumentByUserId = async (user_id: string) => {
    return await db.select().table(DOCUMENT_TABLE_NAME).where({ user_id });
}

export { getDocumentByUserId };
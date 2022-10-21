// (c) Tecnologico de Monterrey 2022, rights reserved.

import { UserType } from "../../types/UserType";
import { GraphQLError, GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { db } from "../../database/database";
import {  USER_TABLE_NAME } from "../../database/utils/database_constants";

export default {
  updateProfileImg: {
    type: UserType, 
    args: {
      user_id: {
        type: GraphQLNonNull(GraphQLID),
      },
      profile_img: {
        type: GraphQLString,
      },
    },
    resolve: async (_: any, { user_id, profile_img }: any) => {
        await db(USER_TABLE_NAME)
        .where("id", user_id)
        .update({ "profile_img" : profile_img })
        .catch((error: Error) => {
        console.error(error);
        throw new GraphQLError(error.name);
      });

      const results = await db(USER_TABLE_NAME).select("profile_img").where("id", user_id);
      return results[0];
    },
  },
};

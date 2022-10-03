// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList } from "graphql";
import { ApplicationType } from "./ApplicationType"
import { db } from "../database/database";
import { APPLICATION_TABLE_NAME } from "../database/utils/database_constants";

export const LabelType: GraphQLObjectType = new GraphQLObjectType({
  name: "Label",
  description: "Label assigned to each application",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: "Label's ID",
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: "Label's name",
    },
    description: {
      type: GraphQLNonNull(GraphQLString),
      description: "Label's description",
    },
    applications: {
      type: GraphQLList(ApplicationType),
      description: "Applications that contains this label",
      /*async resolve ({ application_id }) {
        const sendApplication = await db.select().table(APPLICATION_TABLE_NAME).where("id", application_id);
        return [...sendApplication];
      },*/
    },
    created_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "Label's creation date",
    },
    updated_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "Last time label was updated",
    },
  },
});

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

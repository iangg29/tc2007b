<<<<<<< HEAD
import { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList } from "graphql";
import { ApplicationType } from "./ApplicationType"
=======
// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
>>>>>>> main

export const LabelType = new GraphQLObjectType({
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
      description: "Application where the labels are linked"
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

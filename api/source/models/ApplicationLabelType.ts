// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const ApplicationLabelType = new GraphQLObjectType({
  name: "ApplicationLabel",
  description:
    "Application - Label model, contains all the information related to the labels assigned to an application",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: "ApplicationLabel ID",
    },
    // application_id: {
    //   type: GraphQLNonNull(GraphQLString),
    //   description: "Application ID",
    // },
    // label_id: {
    //   type: GraphQLNonNull(GraphQLString),
    //   description: "Label ID",
    // },
    // created_at: {
    //   type: GraphQLNonNull(GraphQLString),
    //   description: "Date in which label was assigned to the application",
    // },
    // updated_at: {
    //   type: GraphQLNonNull(GraphQLString),
    //   description: "Date in which label was last updated",
    // }
  },
});
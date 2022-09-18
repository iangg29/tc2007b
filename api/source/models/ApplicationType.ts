// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UserType } from "./UserModel";
import { ApplicationStatusType } from "./ApplicationStatusType";
import { CitationType } from "./CitationType";

export const ApplicationType = new GraphQLObjectType({
  name: "Application",
  description:
    "Main application model, contains all the information related with the applications of the users into the system",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: "Application ID",
    },
    user: {
      type: UserType,
      description: "User that uploaded the request",
    },
    title: {
      type: GraphQLNonNull(GraphQLString),
      description: "Application title",
    },
    deadline: {
      type: GraphQLString,
      description: "",
    },
    start_time: {
      type: GraphQLString,
      description: "",
    },
    end_time: {
      type: GraphQLString,
      description: "",
    },
    emission_date: {
      type: GraphQLNonNull(GraphQLString),
      description: "Application emission date",
    },
    response_date: {
      type: GraphQLNonNull(GraphQLString),
      description: "Application response date",
    },
    applicationStatus: {
      type: ApplicationStatusType,
      description: "Application status",
    },
    citation: {
      type: CitationType,
      description: "Citation of the application",
    },
    created_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "Application creation date",
    },
    updated_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "Last time application was updated",
    },
  },
});

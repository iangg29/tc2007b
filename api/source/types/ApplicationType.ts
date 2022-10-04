// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLScalarType, GraphQLString } from "graphql";
import { UserType } from "./UserType";
import { ApplicationStatusType } from "./ApplicationStatusType";
import { CitationType } from "./CitationType";
import { LabelType } from "./LabelType";

export const ApplicationType: GraphQLObjectType = new GraphQLObjectType({
  name: "Application",
  description:
    "Main application model, contains all the information related with the applications of the users into the system",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: "Application ID",
    },
    user: {
      type: GraphQLNonNull(UserType),
      description: "User that uploaded the request",
    },
    title: {
      type: GraphQLNonNull(GraphQLString),
      description: "Application title",
    },
    deadline: {
      type: GraphQLString,
      description: "Date at which the project will be erased from consideration",
    },
    start_time: {
      type: GraphQLString,
      description: "Date at which the user compromises to start their project",
    },
    end_time: {
      type: GraphQLString,
      description: "Date at which the user compromises to finish their project",
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
      type: GraphQLNonNull(ApplicationStatusType),
      description: "Application status",
    },
    labels:{ 
      type: GraphQLList(LabelType)
    },
    citation: {
      type: GraphQLNonNull(CitationType),
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

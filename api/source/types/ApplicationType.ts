// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLID, GraphQLNonNull, GraphQLError, GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { UserType } from "./UserType";
import { ApplicationStatusType } from "./ApplicationStatusType";
import { CitationType } from "./CitationType";
import { DocumentType } from "./DocumentType";
import {LabelType} from "./LabelType";
import { APPLICATION_LABEL_TABLE_NAME, LABEL_TABLE_NAME } from "../database/utils/database_constants";
import { db } from "../database/database";

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
    image: {
      type: GraphQLNonNull(GraphQLString),
      description: "Application image",
    },
    description: {
      type: GraphQLNonNull(GraphQLString),
      description: "Application description",
    },
    support: {
      type: GraphQLNonNull(GraphQLString),
      description: "Application requested support",
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
    citation: {
      type: GraphQLNonNull(CitationType),
      description: "Citation of the application",
    },
    labels: {
      type: GraphQLList(LabelType),
      description: "Labels attached to the application",
      resolve: async({id}) => {
          const applicationLabels = await db
          .select()
          .table(APPLICATION_LABEL_TABLE_NAME)
          .where("application_id", id)
          .catch((error : Error) => {
            console.error(error);
            throw new GraphQLError(error.name);
          });

        const labels = applicationLabels.map(l => l.label_id);

        const labelsOfApplications = await db
          .select()
          .from(LABEL_TABLE_NAME)
          .whereIn('id', labels)
          .catch((error: Error) => {
            console.error(error);
            throw new GraphQLError(error.name);
          });

        return labelsOfApplications;
      }
    },
    applicationDocuments: {
      type: GraphQLList(DocumentType),
      description: "Application documents",
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

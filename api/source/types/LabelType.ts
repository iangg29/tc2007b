// (c) Tecnologico de Monterrey 2022, rights reserved.

import { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLError } from "graphql";
import { db } from "../database/database";
import { APPLICATION_LABEL_TABLE_NAME, APPLICATION_TABLE_NAME } from "../database/utils/database_constants";
import { ApplicationType } from "./ApplicationType";

export const LabelType: GraphQLObjectType = new GraphQLObjectType({
  name: "Label",
  description: "Label assigned to each application",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: "Label's ID",
    },
    label_name: {
      type: GraphQLNonNull(GraphQLString),
      description: "Label's name",
    },
    description: {
      type: GraphQLNonNull(GraphQLString),
      description: "Label's description",
    },
    applications: {
      type: GraphQLList(ApplicationType),
      description: "Application where the labels are linked",
      async resolve({ id }) {
        const applicationLabels = await db
          .select()
          .table(APPLICATION_LABEL_TABLE_NAME)
          .where("label_id", id)
          .catch((error: Error) => {
            console.error(error);
            throw new GraphQLError(error.name);
          });

        const applications = applicationLabels.map((l) => l.application_id);

        const labelsOfApplications = await db
          .select()
          .from(APPLICATION_TABLE_NAME)
          .whereIn("id", applications)
          .catch((error: Error) => {
            console.error(error);
            throw new GraphQLError(error.name);
          });

        return [...labelsOfApplications];
      },
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

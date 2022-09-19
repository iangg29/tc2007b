import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { ApplicationType } from "./ApplicationType";
import { LabelType } from "./LabelType";

export const ApplicationLabelType = new GraphQLObjectType({
  name: "ApplicationLabel",
  description: "Label assigned to a application",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: "Application Label ID",
    },
    application: {
      type: GraphQLNonNull(ApplicationType),
      description: "Application that is labeled",
    },
    label: {
      type: GraphQLNonNull(LabelType),
      description: "Label that is being used",
    },
    created_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "ApplicationLabel creation date",
    },
    updated_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "Las time application label was updated",
    },
  },
});

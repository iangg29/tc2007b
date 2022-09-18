import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const CitationType = new GraphQLObjectType({
  name: "Citation",
  description: "",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID),
      description: "Citation ID",
    },
    title: {
      type: GraphQLNonNull(GraphQLString),
      description: "Citation title",
    },
    description: {
      type: GraphQLNonNull(GraphQLString),
      description: "Citation description",
    },
    /*documentID: {
      type: ,
      description: "",
    },*/
    created_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "Citation creation date",
    },
    updated_at: {
      type: GraphQLNonNull(GraphQLString),
      description: "Last time citation was updated",
    },
  },
});

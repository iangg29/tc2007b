// (c) Tecnologico de Monterrey 2022, rights reserved.

import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

const genApolloServer = async (typeDefs: any, resolvers: any) => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 [API] Server ready at http://localhost:4000${server.graphqlPath}`);
};

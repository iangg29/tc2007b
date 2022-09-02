// (c) Tecnologico de Monterrey 2022, rights reserved.

import { NextFunction, Request, Response } from "express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { getSchema } from "./graphql/schema";
import { getResolvers } from "./graphql/resolvers";
import { handleGraphQLError } from "./graphql/graphqlErrorHandler";
import { getConnectionConfig } from "./database/database";

const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const xss = require("xss-clean");
const { graphqlHTTP } = require("express-graphql");

const ServerError = require("./utils/serverError");
const serverErrorHandler = require("./controllers/errorController");

const app = express();

app.use(
  "/graphql",
  cors(),
  graphqlHTTP({
    schema: makeExecutableSchema({
      typeDefs: getSchema(),
      resolvers: getResolvers(),
    }),
    graphiql: true,
    customFormatErrorFn: handleGraphQLError,
  }),
);

app.enable("trust proxy");
app.use(cors());
app.options("*", cors());
app.use(xss());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "https:", "http:", "data:", "ws:"],
      baseUri: ["'self'"],
      fontSrc: ["'self'", "https:", "http:", "data:"],
      scriptSrc: ["'self'", "https:", "http:", "blob:"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:", "http:"],
      imgSrc: ["'self'", "data:", "blob:"],
    },
  }),
);

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  handler: (req: Request, res: Response, next: NextFunction) => {
    return next(new ServerError(`You've sent too many requests to the server. Please wait...`, 429));
  },
});

app.use("/v1", limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "[API] Try hitting /<resource> endpoint.",
  });
});

if (process.env.NODE_ENV === "development") {
  app.get("/details", (req: Request, res: Response) => {
    res.status(200).json({
      message: "[DEBUG][!!] WARNING, THESE VARIABLES ARE SENSITIVE. ONLY USE IN DEVELOPMENT",
      success: true,
      pg_connection: process.env.PG_CONNECTION_STRING,
      pg_ca_certificate: process.env.PG_CA_CERTIFICATE,
      port: process.env.PORT,
      details: getConnectionConfig(),
    });
  });
}

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Alive",
  });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error: Error = new ServerError(`[!] Endpoint ${req.originalUrl} couldn't be found in this server.`, 404);
  next(error);
});

app.use(serverErrorHandler);

module.exports = app;

// (c) Tecnologico de Monterrey 2022, rights reserved.

import express, { NextFunction, Request, Response } from "express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { getSchema } from "./graphql/schema";
import { getResolvers } from "./graphql/resolvers";
import { handleGraphQLError } from "./graphql/graphqlErrorHandler";
import config from "./database/databaseConfig";
import morgan from "morgan";

import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";

import { ServerError } from "./utils/serverError";
import serverErrorHandler from "./controllers/errorController";

const xss = require("xss-clean");
const app = express();

app.enable("trust proxy");
app.use(cors());
app.options("*", cors());
app.use(xss());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: makeExecutableSchema({
      typeDefs: getSchema(),
      resolvers: getResolvers(),
    }),
    graphiql: process.env.NODE_ENV !== "production",
    customFormatErrorFn: handleGraphQLError,
  }),
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.static(`${__dirname}/public`));

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

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "local") {
  app.get("/details", (req: Request, res: Response) => {
    res.status(200).json({
      message: "[DEBUG] WARNING, THESE VARIABLES ARE SENSITIVE. ONLY USE IN DEVELOPMENT",
      success: true,
      pg_connection: process.env.PG_CONNECTION_STRING,
      app_port: process.env.PORT,
      database_info: config[process.env.NODE_ENV as string],
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

app.use(serverErrorHandler as unknown as express.RequestHandler);

module.exports = app;

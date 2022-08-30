// (c) Tecnologico de Monterrey 2022, rights reserved.

import { NextFunction, Request, Response } from "express";

const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const xss = require("xss-clean");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const ServerError = require("./utils/serverError");
const serverErrorHandler = require("./controllers/errorController");

const app = express();

const schema = buildSchema(`
  type Query {
    ping: String
  }
`);

const root = {
  ping: () => {
    return "pong";
  },
};

app.use(
  "/graphql",
  cors(),
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
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

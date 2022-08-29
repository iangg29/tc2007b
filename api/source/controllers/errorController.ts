// (c) Tecnologico de Monterrey 2022, rights reserved.

import { NextFunction, Request } from "express";

/**
 * Development Error JSON generator.
 * @param error Server error object
 * @param req HTTP Request
 * @param res HTTP Response
 */
const sendErrorDev = (error: ServerError, req: Request, res: Response): void => {
  // @ts-ignore
  res.status(error.statusCode).json({
    status: error.statusType,
    error: error,
    message: error.message,
    stack: error.stack,
  });

  console.error("[!][API]", error);
};

/**
 * Production Error JSON generator.
 * @param error Server error object
 * @param req HTTP Request
 * @param res HTTP Response
 */
const sendErrorProduction = (error: ServerError, req: Request, res: Response) => {
  if (error.isOperational) {
    // @ts-ignore
    return res.status(error.statusCode).json({
      status: error.statusType,
      message: error.message,
    });
  } else {
    console.error("[!][ERROR]", error);
    // @ts-ignore
    res.status(500).json({
      status: error.statusType,
      error: "[!!] Something went very wrong.",
    });
  }
};

module.exports = (error: ServerError, req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  res.locals.error = error;
  error.statusType = error.statusType || STATUS_TYPE.ERROR;
  error.statusCode = error.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    return sendErrorDev(error, req, res);
  } else if (process.env.NODE_ENV === "production") {
    return sendErrorProduction(error, req, res);
  }
  next(error);
};

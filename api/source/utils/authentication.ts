// (c) Tecnologico de Monterrey 2022, rights reserved.

import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { ServerError } from "./serverError";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import { db } from "../database/database";
import { USER_TABLE_NAME } from "../database/utils/database_constants";

const toBool = require("to-bool");

const __DEV__: boolean = process.env.NODE_ENV !== "production";
const IS_AUTH_ENABLED: boolean = toBool(process.env.USE_AUTH);

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  if (IS_AUTH_ENABLED) {
    console.debug("[API] [AUTH] [MIDDLEWARE] Auth enabled.");
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new ServerError("No haz iniciado sesión, por favor inicia sesión antes de continuar.", 401));
    }

    // @ts-ignore
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
    // @ts-ignore
    const user = await db(USER_TABLE_NAME).select().where("email", decoded.email).limit(1);
    if (!user[0]) {
      return next(new ServerError("No se ha podido encontrar este usuario.", 401));
    }

    // @ts-ignore
    req.user = user[0];
    next();
  } else {
    return next();
  }
};

export const isPasswordCorrect = async (candidatePassword: string, userPassword: string): Promise<boolean> => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

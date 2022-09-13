// (c) Tecnologico de Monterrey 2022, rights reserved.

import { NextFunction, Request, Response } from "express";

const __DEV__ = process.env.NODE_ENV !== "production";
const IS_AUTH_ENABLED = process.env.USE_AUTH || true;

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.header("Authorization");
  console.log("IS_AUTH_ENABLED", IS_AUTH_ENABLED);
  if (IS_AUTH_ENABLED) {
    if (authorizationHeader !== undefined) {
      if (__DEV__) console.debug("[DEBUG] [AUTH]", req.header("Authorization"));
      return next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
  } else {
    return next();
  }
};

// (c) Tecnologico de Monterrey 2022, rights reserved.

import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { db } from "../database/database";
import { ROLE_TABLE_NAME, USER_TABLE_NAME } from "../database/utils/database_constants";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { isPasswordCorrect } from "../utils/authentication";

const toBool = require("to-bool");

const IS_AUTH_ENABLED: boolean = toBool(process.env.USE_AUTH);

export const signToken = (email: string): string => {
  return jwt.sign({ email }, process.env.SECRET_KEY as Secret, { expiresIn: process.env.JWT_EXPIRES });
};

export const verifyToken = (req: Request, res: Response) => {
  if (IS_AUTH_ENABLED) {
    let token;
    if (req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(200).json({
        success: false,
        valid: false,
      });
    }

    jwt.verify(token, process.env.SECRET_KEY as Secret, (error: any, decoded: any) => {
      if (error) {
        return res.status(200).json({
          success: false,
          valid: false,
        });
      }
      if (decoded) {
        return res.status(200).json({
          success: true,
          valid: true,
        });
      }
    });
  } else {
    return res.status(200).json({
      success: true,
      valid: true,
    });
  }
};

export const createSendToken = (user: any, statusCode: number, req: Request, res: Response) => {
  const token = signToken(user.email);
  let cookieOptions;
  if (process.env.NODE_ENV !== "production") {
    cookieOptions = {
      expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES_IN as unknown as string) * 60 * 1000),
      httpOnly: true,
    };
  } else {
    cookieOptions = {
      expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES_IN as unknown as string) * 60 * 1000),
      httpOnly: true,
      secure: req.secure,
    };
  }

  res.cookie("token", token, cookieOptions);

  // TODO: Remove password field from user object. Should never be returned within the response.
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  let role = undefined;
  let finalPassword = undefined;
  const roles = await db.select(["id"]).from(ROLE_TABLE_NAME).where("default", true);
  if (roles.length <= 0) {
    const fallback = await db.select(["id"]).from(ROLE_TABLE_NAME);
    if (fallback.length <= 0) {
      res.status(400).json({
        success: false,
        message: "El sistema no cuenta con ningún rol registrado.",
      });
    } else {
      role = fallback[0];
    }
  } else {
    role = roles[0];
  }

  if (role === undefined) {
    res.status(500).json({
      success: false,
      message: "Error cargando roles.",
    });
  }

  const { name, first_lastname, second_lastname, email, cellphone, gender, password, confirm_password } = req.body;

  if (password !== confirm_password)
    res.status(400).json({
      success: false,
      message: "Las contraseñas no coinciden.",
    });

  if (password.split("").length < 8)
    res.status(400).json({
      success: false,
      message: "La contraseña debe de tener al menos 8 caracteres.",
    });

  finalPassword = password;

  const encrypted = await bcrypt.hash(finalPassword, 12);

  try {
    const id = uuid();
    await db(USER_TABLE_NAME).insert({
      id,
      role_id: role.id,
      name,
      first_lastname,
      second_lastname,
      password: encrypted,
      cellphone,
      email,
      gender,
    });
    const newUser = await db(USER_TABLE_NAME).select().where("id", id);

    return createSendToken(newUser, 201, req, res);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "Es necesario un correo y contraseña.",
    });
  }

  const users = await db.select().from(USER_TABLE_NAME).where("email", email);
  if (users.length <= 0) {
    res.status(401).json({
      success: false,
      message: "Usuario no encontrado.",
    });
  }
  const user = users[0];
  const isCorrect: boolean = await isPasswordCorrect(password, user.password);
  if (!isCorrect) {
    res.status(401).json({
      success: false,
      message: "Las credenciales son incorrectas.",
    });
  }

  createSendToken(user, 201, req, res);
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.cookie("token", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
  });
  res.status(200).json({
    success: true,
    message: "La sesión ha sido cerrada.",
  });
};

export const token = async (req: any, res: Response, next: NextFunction) => {
  await createSendToken(req.user, 200, req, res);
};

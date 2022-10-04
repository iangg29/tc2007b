// (c) Tecnologico de Monterrey 2022, rights reserved.

import express from "express";
import { validateToken } from "../utils/authentication";
import { login, logout, signUp, token, verifyToken } from "../controllers/auth.controller";

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/token/verify").get(verifyToken);
router.route("/token").get(validateToken, token);

export default router;

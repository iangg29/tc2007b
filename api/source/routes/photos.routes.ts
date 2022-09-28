// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Router } from "express";
const { uploadFile } = require("./s3");

const router = Router();

router.post("/upload", (req, res) => {
  console.log(req.files["photo"].tempFilePath);

  const result = await uploadFile(req.files["photo"].tempFilePath);

  res.send("Archivo subido");
});

export default router;

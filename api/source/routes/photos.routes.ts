// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Request, Response, Router } from "express";
import { uploadFile } from "../config/S3";

const router = Router();

interface FileRequest extends Request {
  files: any;
}

router.post("/upload/photo", async (req: Request, res: Response) => {
  console.log((req as FileRequest).files["photo"].tempFilePath);

  const result = await uploadFile((req as FileRequest).files["photo"]);

  res.send("Archivo subido");
});

export default router;

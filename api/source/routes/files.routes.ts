// (c) Tecnologico de Monterrey 2022, rights reserved.
import Express from "express";
import { Request, Response, Router } from "express";

const router = Router();

router.post("/uploadfile", (req: Request, res: Response) => {
  console.log({ req });
  res.status(200).json({ message: "Archivo subido" });
});

export default router;

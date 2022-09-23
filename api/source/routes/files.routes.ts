import Express from "express";
import { Router } from "express";

const router = Router();

router.post("/uploadfile", (req: Express.Request, res: Express.Response) => {
  console.log({ req });
  res.status(200).json({ message: "Archivo subido" });
});

export default router;

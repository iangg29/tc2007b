// (c) Tecnologico de Monterrey 2022, rights reserved.
import Express from "express";
import { Request, Response, Router } from "express";

const router = Router();
interface FileRequest extends Request {
  files: any;
}

router.post("/upload/files", async (req: Request, res: Response) => {
  console.log({ req: (req as FileRequest).files });

  if (!(req as FileRequest).files) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = (req as FileRequest).files.doc;
  const file_extension = file.mimetype.split("/").pop();

  switch (file_extension) {
    case "pdf":
      break;
    default:
      return res.status(400).send({ message: "Invalid extension document type." });
  }

  const path = __dirname + "../../../public/upload/files/" + file.name;

  file.mv(path, (err: any) => {
    if (err) {
      console.log({ err });
      return res.status(500).send(err);
    }
    return res.send({ status: "success", path: path });
  });
  // res.status(200).json({ message: "Archivo subido" });
});

export default router;

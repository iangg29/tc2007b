// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Request, Response, Router } from "express";
import path from "path";
// const path = require("path");

const router = Router();

interface FileRequest extends Request {
  files: any;
}

router.post("/upload/photo", async (req: Request, res: Response) => {
  console.log({ req: (req as FileRequest).files });
  if (!(req as FileRequest).files) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = (req as FileRequest).files.photo;
  const file_extension = file.mimetype.split("/").pop();

  switch (file_extension) {
    case "jpeg":
      break;
    case "jpg":
      break;
    case "png":
      break;
    default:
      return res.status(400).send({ message: "Invalid extension document type." });
  }

  const route = path.resolve(__dirname, "../../../public/upload/photos/", file.name);

  file.mv(route, (err: any) => {
    if (err) {
      console.log({ err });
      return res.status(500).send(err);
    }
    return res.send({ status: "success", route: route });
  });
});

export default router;
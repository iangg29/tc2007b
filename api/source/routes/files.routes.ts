// (c) Tecnologico de Monterrey 2022, rights reserved.
import { Request, Response, Router } from "express";
import path from "path";
import { validateToken } from "../utils/authentication";
const multer = require("multer");
const upload = multer();

const router = Router();

router.post("/upload/files", validateToken, upload.any(), async (req: Request, res: Response) => {
  const formData = req.files;
  const id = (req as any).user.id;
  console.log({ formData });
  console.log({ id });
  // return res.send("recieved your request!");

  console.log({ req: (req as DataForm).form });

  if (!(req as DataForm).form) {
    return res.status(400).send("No files were uploaded.");
  }

  console.log({ "El id que le está llegando a esta madre es ": "xd", id: (req as DataForm).get("id_user") });

  const file = (req as DataForm).form["1"];
  const file_extension = file.mimetype.split("/").pop();

  console.log({ "El tipo de archivo que se pasa es: ": file_extension });

  switch (file_extension) {
    case "pdf":
      break;
    default:
      return res.status(400).send({ message: "Invalid extension document type." });
  }

  const route = path.resolve(__dirname, "../../public/uploads/files/", file.name);

  file.mv(route, (err: any) => {
    if (err) {
      console.log({ err });
      return res.status(500).send(err);
    }
    return res.send({ status: "success", route: route });
  });
});

export default router;

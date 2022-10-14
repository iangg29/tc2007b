// (c) Tecnologico de Monterrey 2022, rights reserved.
import { Request, Response, Router } from "express";
import path from "path";
import { validateToken } from "../utils/authentication";
const multer = require("multer");
// const upload = multer();
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "public/uploads/photos");
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
    console.log("invalid document type!");
  }
};

const upload = multer({ storage }, { fileFilter }).any();
// const route = path.resolve(__dirname, "../../public/uploads/files/", file.name);

const router = Router();

router.post("/upload/photos", validateToken, async (req: Request, res: Response) => {
  upload(req, res, function (err: any) {
    try {
      if (err instanceof multer.MulterError) {
        console.log({ err });
        // A Multer error occurred when uploading.
        return res.status(500).send({ err });
      } else if (err) {
        console.log({ err });
        return res.status(500).send({ err });
        // An unknown error occurred when uploading.
      }
      const files = req.files;
      const id = (req as any).user.id;
      console.log("El archivo que se esta pasando es: ", { files });
      console.log({ id });
      return res.send("recieved your request!");
    } catch (err) {
      console.log({ err });
    }
  });
});

export default router;

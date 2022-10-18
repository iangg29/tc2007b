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
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    return cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Tipo de documento invalido, por favor verifique, solo PNG, JPEG o JPG"));
  }
};

const upload = multer({ storage, fileFilter }).any();
// const route = path.resolve(__dirname, "../../public/uploads/files/", file.name);

const router = Router();

router.post("/upload/photos", validateToken, async (req: Request, res: Response) => {
  try {
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
        console.log({ files });
        const paths = (files as any).map((el: any) => {
          return { id: el.fieldname, path: `${process.env.BASE_URL}/uploads/photos/${el.filename}` };
        });
        return res.send({ paths });
      } catch (err) {
        console.log({ err });
        return res.status(500).send({ err });
      }
    });
  } catch (err) {
    return res.status(500).send({ err });
  }
});

export default router;

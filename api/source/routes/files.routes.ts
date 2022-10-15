// (c) Tecnologico de Monterrey 2022, rights reserved.
import { Request, Response, Router } from "express";
import path from "path";
import { validateToken } from "../utils/authentication";
const multer = require("multer");
// const upload = multer();
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "public/uploads/files");
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(null, false);
    console.log("invalid document type!");
  }
};

const upload = multer({ storage, fileFilter }).any();
// const route = path.resolve(__dirname, "../../public/uploads/files/", file.name);

const router = Router();

router.post("/upload/files", validateToken, async (req: Request, res: Response) => {
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
        return { id: el.fieldname, path: `${process.env.BASE_URL}uploads/files/${el.filename}` };
      });
      return res.send({ paths });
    } catch (err) {
      console.log({ err });
      return res.status(500).send({ err });
    }
  });
});

export default router;

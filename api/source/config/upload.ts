// (c) Tecnologico de Monterrey 2022, rights reserved.

const fileupload = require("express-fileupload");

export const photosUpload = fileupload({
  limit: { fileSize: 5 * 1024 * 1024 },
});

export const filesUpload = fileupload({
  limit: { fileSize: 80 * 1024 * 1024 },
});

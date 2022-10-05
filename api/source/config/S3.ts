// (c) Tecnologico de Monterrey 2022, rights reserved.

import * as fs from "fs";
require("dotenv").config();
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;

console.log({ AWS_BUCKET_NAME, AWS_PUBLIC_KEY, AWS_SECRET_KEY, AWS_BUCKET_REGION });
const client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accesKeyId: AWS_PUBLIC_KEY,
    secretAccesKeyId: AWS_SECRET_KEY,
  },
});

export async function uploadFile(file: any) {
  const stream = fs.createReadStream(file.tempFilePath);
  const uploadParams = {
    Bucket: AWS_BUCKET_NAME, // Se manda al bucket
    Key: file.name, // Se guarda con esta llave
    Body: stream,
  };

  const command = new PutObjectCommand(uploadParams);
  return await client.send(command);
}

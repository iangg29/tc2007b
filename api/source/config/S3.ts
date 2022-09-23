import * as fs from "fs";
require("dotenv").config();
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;

const client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accesKeyId: AWS_PUBLIC_KEY,
    secretAccesKeyId: AWS_SECRET_KEY,
  },
});

async function uploadFile(pathFile: string) {
  const stream = fs.createReadStream(pathFile);
  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: "archivo",
    Body: stream,
  };

  const command = new PutObjectCommand(uploadParams);
  return await client.send(command);
}
module.exports = {
  uploadFile,
};

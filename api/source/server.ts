// (c) Tecnologico de Monterrey 2022, rights reserved.
import { resolve } from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: resolve(__dirname, "../.env") });

process.on("uncaughtException", (error: Error) => {
  console.error("[!][API] UNCAUGHT_EXCEPTION :: SHUTTING DOWN!");
  console.error("[!][API]", error.name, error.message);
  console.error("[!][API]", error);
  process.exit(1);
});

const application = require("./app");
const PORT = process.env.PORT || 5050;

const server = application.listen(PORT, () => {
  console.log(`🚀 [API] Listening on port ${PORT}`);
});

process.on("unhandledRejection", (error: Error) => {
  console.error("[!][API] UNCAUGHT_EXCEPTION :: SHUTTING DOWN!");
  console.error("[!][API]", error.name, error.message);
  console.error("[!][API]", error);
  server.close(() => {
    process.exit(1);
  });
});

export {};

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
const toBool = require("to-bool");

const server = application.listen(PORT, () => {
  console.log(`=====================================`);
  console.log(`🚀 [API] Listening on port ${PORT}`);
  console.log(`💻 [API] Running in ${process.env.NODE_ENV} mode.`);
  console.log(`🔐 [API] Authentication is ${toBool(process.env.USE_AUTH) ? "enabled" : "disabled"}.`);
  console.log(`=====================================`);
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

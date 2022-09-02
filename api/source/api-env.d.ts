// (c) Tecnologico de Monterrey 2022, rights reserved.

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      BASE_URL: string;
      PG_CONNECTION_STRING: string;
      PG_CA_CERTIFICATE: string;
      PORT: number;
    }
  }
}

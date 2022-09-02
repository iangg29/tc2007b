// (c) Tecnologico de Monterrey 2022, rights reserved.

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      BASE_URL: string;
      PG_CONNECTION_STRING: string;
      PG_HOST: string;
      PG_PORT: number;
      PG_USER: string;
      PG_PASSWORD: string;
      PG_DATABASE: string;
      PG_CA_CERTIFICATE: string;
      PORT: number;
    }
  }
}

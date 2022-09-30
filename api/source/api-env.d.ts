// (c) Tecnologico de Monterrey 2022, rights reserved.

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      BASE_URL: string;
      DB_CACERT: string;
      PG_HOST: string;
      PG_PORT: number;
      PG_USER: string;
      PG_PASSWORD: string;
      PG_DATABASE: string;
      PG_CA_CERTIFICATE: string;
      PORT: number;
      USE_AUTH: boolean;
      SECRET_KEY: string;
      JWT_EXPIRES: string;
      JWT_COOKIE_EXPIRES_IN: number;
    }
  }
}

export {};

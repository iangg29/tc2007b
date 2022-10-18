// (c) Tecnologico de Monterrey 2022, rights reserved.

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      DB_HOST: string;
      DB_PORT: number;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_DATABASE: string;
      PORT: number;
      USE_AUTH: boolean;
      SECRET_KEY: string;
      JWT_EXPIRES: string;
      JWT_COOKIE_EXPIRES_IN: number;
    }
  }
}

export {};

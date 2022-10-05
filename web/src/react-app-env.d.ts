// (c) Tecnologico de Monterrey 2022, rights reserved.

/* / <reference types="react-scripts" /> */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_URL: string;
    }
  }
}

declare module "babel-plugin-relay/macro" {
  export { graphql as default } from "react-relay";
}

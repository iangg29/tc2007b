// (c) Tecnologico de Monterrey 2022, rights reserved.

declare module "babel-plugin-relay/macro" {
  export { graphql } from "react-relay";
}

declare module "@env" {
  export const API_URL: string;
}

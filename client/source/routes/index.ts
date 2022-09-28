// (c) Tecnologico de Monterrey 2022, rights reserved.

import Login from "../screens/auth/Login";
import Landing from "../screens/general/Landing";

export interface iRoute {
  name: string;
  component: any;
}

export const Routes: iRoute[] = [
  {
    name: "Landing",
    component: Landing,
  },
  {
    name: "Login",
    component: Login,
  },
];

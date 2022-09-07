// (c) Tecnologico de Monterrey 2022, rights reserved.

import { iRoute } from "../shared/types/AppTypes";
import { lazy } from "react";

const Dashboard = lazy(async () => await import("../pages/Dashboard"));

const routes: iRoute[] = [
  {
    path: "/",
    components: Dashboard,
  },
];

export default routes;

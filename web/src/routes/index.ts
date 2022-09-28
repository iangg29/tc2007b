// (c) Tecnologico de Monterrey 2022, rights reserved.

import { iRoute } from "../shared/types/AppTypes";
import { lazy } from "react";

const Dashboard = lazy(async () => await import("../pages/Dashboard"));
const Home = lazy(async () => await import("../pages/home/Home"));
const ApproveDocs = lazy(async () => await import("../pages/suppRequests/ApproveDoc"));

const routes: iRoute[] = [
  {
    path: "/",
    components: Dashboard,
  },
  {
    path: "/Home",
    components: Home,
  },
  {
    path: "/solicitudes/revisardocumentos",
    components: ApproveDocs,
  },
];

export default routes;

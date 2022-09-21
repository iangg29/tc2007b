// (c) Tecnologico de Monterrey 2022, rights reserved.

import { iRoute } from "../shared/types/AppTypes";
import { lazy } from "react";

const Dashboard = lazy(async () => await import("../pages/Dashboard"));
const Profile = lazy(async () => await import("../pages/Profile"));
const Home = lazy(async () => await import("../pages/home/Home"));
const ApproveDocs = lazy(async () => await import("../pages/suppRequests/ApproveDoc"));

const routes: iRoute[] = [
  {
    path: "/",
    components: Dashboard,
  },
  {
    path: "/profile",
    components: Profile,
  },
  {
    path: "/Home",
    components: Home,
  },
  {
    path: "/Solicitudes/RevisarDocumentos",
    components: ApproveDocs,
  },
];

export default routes;

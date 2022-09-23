// (c) Tecnologico de Monterrey 2022, rights reserved.

import { iRoute } from "../shared/types/AppTypes";
import { lazy } from "react";

const Dashboard = lazy(async () => await import("../pages/Dashboard"));
const Home = lazy(async () => await import("../pages/home/Home"));
const ApproveDocs = lazy(async () => await import("../pages/suppRequests/ApproveDoc"));
const ApproveApplications = lazy(async () => await import("../pages/suppRequests/ApproveApplication"));
const ApplicationAccepted = lazy(async () => await import("../pages/suppRequests/ApplicationAccepted"));
const ApplicationFinalized = lazy(async () => await import("../pages/suppRequests/ApplicationFinalized"));

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
    path: "/Solicitudes/RevisarDocumentos",
    components: ApproveDocs,
  },
  {
    path: "/Solicitudes/RevisarPropuestas",
    components: ApproveApplications,
  },
  {
    path: "/Solicitudes/RevisarAprobadas",
    components: ApplicationAccepted,
  },
  {
    path: "/Solicitudes/RevisarFinalizadas",
    components: ApplicationFinalized,
  },
];

export default routes;

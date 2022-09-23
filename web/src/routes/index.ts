// (c) Tecnologico de Monterrey 2022, rights reserved.

import { iRoute } from "../shared/types/AppTypes";
import { lazy } from "react";

const Dashboard = lazy(async () => await import("../pages/Dashboard"));
const Profile = lazy(async () => await import("../pages/Profile"));
const Home = lazy(async () => await import("../pages/home/Home"));
const ApproveDocs = lazy(async () => await import("../pages/suppRequests/ApproveDoc"));

const Detail = lazy(async () => await import("../pages/Req_Detail"));
const Documentation = lazy(async () => await import("../pages/Req_Documentation"));
const Evidence = lazy(async () => await import("../pages/Req_Evidence"));

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
  {
    path: "/Solicitudes/RevisarDocumentos/Documentos",
    components: Documentation,
  },
  {
    path: "/Solicitudes/RevisarDocumentos/Detalle",
    components: Detail,
  },
  {
    path: "/Solicitudes/RevisarDocumentos/Evidencia",
    components: Evidence,
  },
];

export default routes;

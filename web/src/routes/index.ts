// (c) Tecnologico de Monterrey 2022, rights reserved.

import { iRoute } from "../shared/types/AppTypes";
import { lazy } from "react";

const Dashboard = lazy(async () => await import("../pages/Dashboard"));
const NewAnnouncement = lazy(async () => await import("../pages/NewAnnouncement"));
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
    path: "/Home",
    components: Home,
  },
  {
    path: "/solicitudes/revisardocumentos",
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
  {
    path: "/newannouncement",
    components: NewAnnouncement,
  },
];

export default routes;

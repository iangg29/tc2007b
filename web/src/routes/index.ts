// (c) Tecnologico de Monterrey 2022, rights reserved.

import { iRoute } from "../shared/types/AppTypes";
import { lazy } from "react";

const Dashboard = lazy(async () => await import("../pages/Dashboard"));
const NewAnnouncement = lazy(async () => await import("../pages/NewAnnouncement"));
const Home = lazy(async () => await import("../pages/home/Home"));
const ApproveDocs = lazy(async () => await import("../pages/suppRequests/ApproveDoc"));
const Applications = lazy(async () => await import("../pages/suppRequests/Applications"));
const ApproveApplications = lazy(async () => await import("../pages/suppRequests/ApproveApplication"));
const ApplicationAccepted = lazy(async () => await import("../pages/suppRequests/ApplicationAccepted"));
const ApplicationFinalized = lazy(async () => await import("../pages/suppRequests/ApplicationFinalized"));
const Analytic = lazy(async () => await import("../pages/analytics/Analytic"));
const Detail = lazy(async () => await import("../pages/Req_Detail"));
const Documentation = lazy(async () => await import("../pages/Req_Documentation"));
const Evidence = lazy(async () => await import("../pages/Req_Evidence"));

const routes: iRoute[] = [
  {
    path: "/",
    components: Dashboard,
  },
  {
    path: "/home",
    components: Home,
  },
  {
    path: "/analytics",
    components: Analytic,
  },
  {
    path: "/applications/reviewdocuments",
    components: ApproveDocs,
  },
  {
    path: "/applications",
    components: Applications,
  },
  {
    path: "/applications/reviewdocuments/:applicationId",
    components: Documentation,
  },
  {
    path: "/applications/reviewproposals",
    components: ApproveApplications,
  },
  {
    path: "/applications/reviewproposals/:applicationId",
    components: Detail,
  },
  {
    path: "/applications/reviewapproved",
    components: ApplicationAccepted,
  },
  {
    path: "/applications/reviewapproved/:applicationId",
    components: Detail,
  },
  {
    path: "/applications/reviewfinished",
    components: ApplicationFinalized,
  },
  {
    path: "/applications/reviewfinished/:applicationId",
    components: Evidence,
  },
  {
    path: "/newannouncement",
    components: NewAnnouncement,
  },
];

export default routes;

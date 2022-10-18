// (c) Tecnologico de Monterrey 2022, rights reserved.

import { iRoute } from "../shared/types/AppTypes";
import { lazy } from "react";

const Dashboard = lazy(async () => await import("../pages/Dashboard"));
const NewAnnouncement = lazy(async () => await import("../pages/NewAnnouncement"));
const Home = lazy(async () => await import("../pages/home/Home"));
const ApproveDocs = lazy(async () => await import("../pages/suppRequests/ApproveDoc"));
const ApproveApplications = lazy(async () => await import("../pages/suppRequests/ApproveApplication"));
const ApplicationAccepted = lazy(async () => await import("../pages/suppRequests/ApplicationAccepted"));
const ApplicationFinalized = lazy(async () => await import("../pages/suppRequests/ApplicationFinalized"));
const Analytic = lazy(async () => await import("../pages/analytics/Analytic"));
const Detail = lazy(async () => await import("../pages/Req_Detail"));
const Documentation = lazy(async () => await import("../pages/Req_Documentation"));
const Evidence = lazy(async () => await import("../pages/Req_Evidence"));
const Profile = lazy(async () => await import("../pages/Profile"));

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
    path: "/applications/reviewdocuments/:status",
    components: ApproveDocs,
  },
  {
    path: "/applications/reviewdocuments/2/:applicationId",
    components: Documentation,
  },
  {
    path: "/applications/reviewproposals/:status",
    components: ApproveApplications,
  },
  {
    path: "/applications/reviewproposals/3/:applicationId",
    components: Detail,
  },
  {
    path: "/applications/reviewapproved/:status",
    components: ApplicationAccepted,
  },
  {
    path: "/applications/reviewapproved/5/:applicationId",
    components: Detail,
  },
  {
    path: "/applications/reviewfinished/:status",
    components: ApplicationFinalized,
  },
  {
    path: "/applications/reviewfinished/6/:applicationId",
    components: Evidence,
  },
  {
    path: "/newannouncement",
    components: NewAnnouncement,
  },
  {
    path: "/profile",
    components: Profile,
  },
];

export default routes;

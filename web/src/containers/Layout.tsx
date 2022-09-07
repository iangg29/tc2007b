// (c) Tecnologico de Monterrey 2022, rights reserved.

import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Wrapper from "./Wrapper";
import { iRoute } from "../shared/types/AppTypes";
import routes from "../routes";

const Error404 = lazy(async () => await import("../pages/Error404"));

const Layout = (): JSX.Element => {
  return (
    <div>
      <Wrapper>
        <Routes>
          {routes.map((route: iRoute, idx: number) => (
            <Route key={idx} path={route.path} element={<route.components />} />
          ))}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Wrapper>
    </div>
  );
};
export default Layout;

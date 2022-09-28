// (c) Tecnologico de Monterrey 2022, rights reserved.

import { lazy, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Wrapper from "./Wrapper";
import { iRoute } from "../shared/types/AppTypes";
import routes from "../routes";
import { useAppSelector } from "../store/hooks";
import { selectIsLoggedIn } from "../store/slices/authSlice";
import Cookies from "js-cookie";
import Login from "../pages/auth/Login";

const Error404 = lazy(async () => await import("../pages/Error404"));

const Layout = (): JSX.Element => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if ((isLoggedIn !== undefined && isLoggedIn === false) || Cookies.get("token") === undefined) {
      navigate("/login");
    }
  });

  if (isLoggedIn === true) {
    return (
      <>
        <Wrapper>
          <Routes>
            {routes.map((route: iRoute, idx: number) => (
              <Route key={idx} path={route.path} element={<route.components />} />
            ))}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Wrapper>
      </>
    );
  }

  return (
    <>
      <Login />
    </>
  );
};
export default Layout;

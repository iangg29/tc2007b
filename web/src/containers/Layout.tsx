// (c) Tecnologico de Monterrey 2022, rights reserved.

import { lazy, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Wrapper from "./Wrapper";
import { iRoute } from "../shared/types/AppTypes";
import routes from "../routes";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectIsLoggedIn, setToken } from "../store/slices/authSlice";
import Cookies from "js-cookie";

const Error404 = lazy(async () => await import("../pages/Error404"));

const Layout = (): JSX.Element => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn === false) {
      if (Cookies.get("token") !== null) {
        // VALIDATE TOKEN
        dispatch(setToken(Cookies.get("token") as string));
      } else {
        navigate("/login");
      }
    }
  }, [isLoggedIn]);

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

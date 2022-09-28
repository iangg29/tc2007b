// (c) Tecnologico de Monterrey 2022, rights reserved.

import graphql from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { DashboardQuery, DashboardQuery$data } from "./__generated__/DashboardQuery.graphql";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectUser, setToken } from "../store/slices/authSlice";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Dashboard = (): JSX.Element => {
  const user: any = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = (): void => {
    (async () => {
      return await axios.get((process.env.REACT_APP_API_URL as string) + "/auth/logout");
    })()
      .then((res: AxiosResponse<any>) => {
        const { success, message } = res.data;
        if (success as boolean) {
          alert(message);
          dispatch(setToken(""));
          Cookies.remove("token");
          navigate("/");
        }
      })
      .catch((e) => console.error(e));
  };

  const data: DashboardQuery$data = useLazyLoadQuery<DashboardQuery>(
    graphql`
      query DashboardQuery {
        users {
          id
          name
          email
        }
      }
    `,
    {},
  );

  console.debug(data);

  return (
    <div>
      <h1>Hello, {user.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;

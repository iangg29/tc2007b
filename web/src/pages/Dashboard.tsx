// (c) Tecnologico de Monterrey 2022, rights reserved.

import graphql from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { DashboardQuery, DashboardQuery$data } from "./__generated__/DashboardQuery.graphql";

const Dashboard = (): JSX.Element => {
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

  return <div>Test</div>;
};

export default Dashboard;

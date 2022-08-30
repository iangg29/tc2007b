// (c) Tecnologico de Monterrey 2022, rights reserved.

import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { LandingQuery, LandingQuery$data } from "./__generated__/LandingQuery.graphql";

const Landing = (): JSX.Element => {
  const data: LandingQuery$data = useLazyLoadQuery<LandingQuery>(
    graphql`
      query LandingQuery {
        ping
      }
    `,
    {},
  );

  console.log(data);

  return <div>Landing page</div>;
};

export default Landing;

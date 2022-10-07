// (c) Tecnologico de Monterrey 2022, rights reserved.

import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import RequestMap from "../../components/RequestCard/RequestMap";

import { ApplicationsQuery$data, ApplicationsQuery } from "./__generated__/ApplicationsQuery.graphql";

const Applications = (): JSX.Element => {
  const data: ApplicationsQuery$data = useLazyLoadQuery<ApplicationsQuery>(
    graphql`
      query ApplicationsQuery {
        applications {
          title
          id
          user {
            id
            name
            first_lastname
            second_lastname
          }
          citation {
            id
            title
          }
          labels {
            id
            label_name
          }
        }
      }
    `,
    {},
    { fetchPolicy: "network-only" },
  );

  const { applications } = data;
  const empty = applications?.length === 0;

  return (
    <>
      <h5 className="py-5 text-2xl text-main-100">Solicitudes enviadas</h5>
      <div className="grid grid-cols-3">
        {empty ? (
          <h1 className="col-span-3 text-center">
            <br />
            No hay solicitudes.
          </h1>
        ) : (
          applications?.map((element: any) => (
            <RequestMap
              key={element.id}
              text={"Text"}
              color={"#50245C"}
              link={"app/applications"}
              element={element}
            ></RequestMap>
          ))
        )}
      </div>
    </>
  );
};

export default Applications;

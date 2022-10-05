// (c) Tecnologico de Monterrey 2022, rights reserved.

import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import {
  ApplicationFinalizedQuery,
  ApplicationFinalizedQuery$data,
} from "./__generated__/ApplicationFinalizedQuery.graphql";
import RequestMap from "../../components/RequestCard/RequestMap";

const ApplicationFinalized = (): JSX.Element => {
  const data: ApplicationFinalizedQuery$data = useLazyLoadQuery<ApplicationFinalizedQuery>(
    graphql`
      query ApplicationFinalizedQuery($application_status_id: ID!) {
        applicationByStatusID(application_status_id: $application_status_id) {
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
        }
      }
    `,
    { application_status_id: "" },
    { fetchPolicy: "network-only" },
  );

  const { applicationByStatusID } = data;
  const empty = applicationByStatusID?.length === 0;

  return (
    <>
      <h5 className=" py-5 text-2xl text-main-100">Solicitudes finalizadas</h5>

      <div className="grid grid-cols-3">
        {empty ? (
          <h1 className="col-span-3 text-center">
            <br />
            No hay solicitudes finalizadas.
          </h1>
        ) : (
          applicationByStatusID?.map((element: any) => (
            <RequestMap
              key={element.id}
              element={element}
              text={"Ver"}
              color={"#D0A52A"}
              link={"/app/applications/reviewfinished/" + element.id}
            ></RequestMap>
          ))
        )}
      </div>
    </>
  );
};

export default ApplicationFinalized;

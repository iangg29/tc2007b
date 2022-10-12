// (c) Tecnologico de Monterrey 2022, rights reserved.

import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import {
  ApplicationAcceptedQuery,
  ApplicationAcceptedQuery$data,
} from "./__generated__/ApplicationAcceptedQuery.graphql";
import RequestMap from "../../components/RequestCard/RequestMap";

const ApplicationAccepted = (): JSX.Element => {
  const data: ApplicationAcceptedQuery$data = useLazyLoadQuery<ApplicationAcceptedQuery>(
    graphql`
      query ApplicationAcceptedQuery($application_status_id: ID!) {
        applicationByStatusID(application_status_id: $application_status_id) {
          application_title
          id
          user {
            id
            name
            first_lastname
            second_lastname
          }
          citation {
            id
            citation_title
          }
          labels {
            id
            label_name
          }
        }
      }
    `,
    { application_status_id: "5" },
    { fetchPolicy: "network-only" },
  );

  const { applicationByStatusID } = data;
  const empty = applicationByStatusID?.length === 0;

  return (
    <>
      <div className="px-10">
        <h5 className=" py-5 text-2xl text-main-100 font-semibold">Solicitudes aceptadas</h5>

        <div className="grid grid-cols-3">
          {empty ? (
            <h1 className="col-span-3 text-center">
              <br />
              No hay solicitudes aprobadas.
            </h1>
          ) : (
            applicationByStatusID?.map((element: any) => (
              <RequestMap
                key={element.id}
                element={element}
                text={"Dar seguimiento"}
                color={"#50245C"}
                link={`/app/applications/reviewapproved/${String(element.id)}`}
              ></RequestMap>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ApplicationAccepted;

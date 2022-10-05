// (c) Tecnologico de Monterrey 2022, rights reserved.

import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import { ApproveApplicationQuery, ApproveApplicationQuery$data } from "./__generated__/ApproveApplicationQuery.graphql";
import RequestMap from "../../components/RequestCard/RequestMap";

const ApproveApplication = (): JSX.Element => {
  const data: ApproveApplicationQuery$data = useLazyLoadQuery<ApproveApplicationQuery>(
    graphql`
      query ApproveApplicationQuery($application_status_id: ID!) {
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
          labels{
              id
              name
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
      <h5 className=" py-5 text-2xl text-main-100">Solicitudes para revisión de propuestas</h5>

      <div className="grid grid-cols-3">
        {empty ? (
          <h1 className="col-span-3 text-center">
            <br />
            No hay solicitudes pendientes de revisión de propuesta.
          </h1>
        ) : (
          applicationByStatusID?.map((element: any) => (
            <RequestMap
              key={element.id}
              element={element}
              text={"Revisar Propuesta"}
              color={"#252d53"}
              link={"/app/applications/reviewproposals/" + element.id}
            ></RequestMap>
          ))
        )}
      </div>
    </>
  );
};

export default ApproveApplication;

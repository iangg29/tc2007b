// (c) Tecnologico de Monterrey 2022, rights reserved.

import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import { ApproveDocQuery, ApproveDocQuery$data } from "./__generated__/ApproveDocQuery.graphql";
import RequestMap from "../../components/RequestCard/RequestMap";

const ApproveDoc = (): JSX.Element => {
  const data: ApproveDocQuery$data = useLazyLoadQuery<ApproveDocQuery>(
    graphql`
      query ApproveDocQuery($application_status_id: ID!) {
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
  );

  const { applicationByStatusID } = data;
  const empty = applicationByStatusID?.length === 0;

  return (
    <>
      <h5 className=" py-5 text-2xl text-main-100">Solicitudes para revisión de documentos</h5>

      <div className="grid grid-cols-3">
        {empty ? (
          <h1 className="col-span-3 text-center">
            <br />
            No hay solicitudes pendientes de revisión de documentos.
          </h1>
        ) : (
          applicationByStatusID?.map((element: any) => (
            <RequestMap
              key={element.id}
              element={element}
              text={"Revisar documentos"}
              color={"#244B5C"}
              link={"/app/applications/reviewdocuments/" + element.id}
            ></RequestMap>
          ))
        )}
      </div>
    </>
  );
};

export default ApproveDoc;

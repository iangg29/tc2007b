// (c) Tecnologico de Monterrey 2022, rights reserved.

import RequestCard from "../components/RequestCard/RequestCard";
import back from "../../assets/background/login.png";
import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import { ApproveDocQuery, ApproveDocQuery$data } from "./__generated__/ApproveDocQuery.graphql";

const ApproveDoc = (): JSX.Element => {
  const data: ApproveDocQuery$data = useLazyLoadQuery<ApproveDocQuery>(
    graphql`
      query ApproveDocQuery {
        applicationStatusID(application_status_id: "1a0e00ff-08c7-49b9-8c08-6285e5bda7d7") {
          id
          title
          applicationStatus {
            id
            name
          }
          user_id
        }
      }
    `,
    {},
  );

  const exampleLabels = [{ label: "Cultura" }, { label: "Baile" }];

  const { applicationStatusID } = data;

  const empty = applicationStatusID?.length;

  console.debug(applicationStatusID);

  return (
    <>
      <h5 className=" py-5 text-2xl text-main-100">Solicitudes para revisión de documentos</h5>

      <div className="grid grid-cols-3">
        {applicationStatusID?.map((element: any) => (
          <RequestCard
            key={element.id}
            image={back}
            proyectTile={element.title}
            announcement={element.application_status_id}
            user={element.user_id}
            label={exampleLabels}
            buttonText="Revisar nuevamente"
            color="#244B5C"
          />
        ))}
      </div>

      {empty !== 0 ? (
        <></>
      ) : (
        <h1 className="text-center">
          <br />
          No hay solicitudes pendientes de revisión de documentos.
        </h1>
      )}
    </>
  );
};

export default ApproveDoc;

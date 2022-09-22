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
        applications {
          id
          title
          application_status_id
          user_id
        }
      }
    `,
    {},
  );

  const exampleLabels = [{ label: "Cultura" }, { label: "Baile" }];

  const { applications } = data;

  console.debug(applications);

  return (
    <>
      <h5 className=" py-5 text-2xl text-main-100">Solicitudes para revisión de documentos</h5>

      <div className="grid grid-cols-3">
        {applications?.map((element: any) => (
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
        ))}{" "}
        :{" "}
        <h1>
          <br />
          No hay solicitudes pendientes de revisión de documentos
        </h1>
      </div>
    </>
  );
};

export default ApproveDoc;

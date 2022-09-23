// (c) Tecnologico de Monterrey 2022, rights reserved.

import RequestCard from "../components/RequestCard/RequestCard";
import back from "../../assets/background/login.png";
import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import { ApproveApplicationQuery, ApproveApplicationQuery$data } from "./__generated__/ApproveApplicationQuery.graphql";

const ApproveApplication = (): JSX.Element => {
  const data: ApproveApplicationQuery$data = useLazyLoadQuery<ApproveApplicationQuery>(
    graphql`
      query ApproveApplicationQuery {
        applicationByStatusID(application_status_id: "1db31830-bc92-456b-aa71-e27523ceb6e3") {
          application {
            id
            title
          }
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
    {},
  );

  const exampleLabels = [{ label: "Cultura" }, { label: "Baile" }];

  const { applicationByStatusID } = data;

  console.debug(applicationByStatusID);

  const empty = applicationByStatusID?.length;

  return (
    <>
      <h5 className=" py-5 text-2xl text-main-100">Solicitudes para revisión de propuestas</h5>

      <div className="grid grid-cols-3">
        {applicationByStatusID?.map((element: any) => (
          <RequestCard
            key={element.id}
            image={back}
            proyectTile={element.application.title}
            announcement={element.citation.title}
            userName={element.user.name}
            userFirstName={element.user.first_lastname}
            userLastName={element.user.second_lastname}
            label={exampleLabels}
            buttonText="Revisar"
            color="#252d53"
          />
        ))}
      </div>
      {empty !== 0 ? (
        <></>
      ) : (
        <h1 className="text-center">
          <br />
          No hay solicitudes pendientes de revisión de propuesta.
        </h1>
      )}
    </>
  );
};

export default ApproveApplication;

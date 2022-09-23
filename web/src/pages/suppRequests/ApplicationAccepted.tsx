// (c) Tecnologico de Monterrey 2022, rights reserved.

import RequestCard from "../components/RequestCard/RequestCard";
import back from "../../assets/background/login.png";
import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import {
  ApplicationAcceptedQuery,
  ApplicationAcceptedQuery$data,
} from "./__generated__/ApplicationAcceptedQuery.graphql";

const ApplicationAccepted = (): JSX.Element => {
  const data: ApplicationAcceptedQuery$data = useLazyLoadQuery<ApplicationAcceptedQuery>(
    graphql`
      query ApplicationAcceptedQuery {
        applicationStatusID(application_status_id: "c444ebfd-8f39-47dd-ab1e-93150dec7cad") {
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

  const { applicationStatusID } = data;

  console.debug(applicationStatusID);

  const empty = applicationStatusID?.length;

  return (
    <>
      <h5 className=" py-5 text-2xl text-main-100">Solicitudes aceptadas</h5>

      <div className="grid grid-cols-3">
        {applicationStatusID?.map((element: any) => (
          <RequestCard
            key={element.id}
            image={back}
            proyectTile={element.title}
            announcement={element.application_status_id}
            user={element.user_id}
            label={exampleLabels}
            buttonText="Dar seguimiento"
            color="#50245C"
          />
        ))}
      </div>
      {empty !== 0 ? (
        <></>
      ) : (
        <h1 className="text-center">
          <br />
          No hay solicitudes finalizadas.
        </h1>
      )}
    </>
  );
};

export default ApplicationAccepted;

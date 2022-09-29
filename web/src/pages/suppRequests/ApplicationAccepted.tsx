// (c) Tecnologico de Monterrey 2022, rights reserved.

import RequestCard from "../../components/RequestCard/RequestCard";
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
      query ApplicationAcceptedQuery($application_status_id: ID!) {
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

  const exampleLabels = [{ label: "Cultura" }, { label: "Baile" }];

  const { applicationByStatusID } = data;

  console.debug(applicationByStatusID);

  const empty = applicationByStatusID?.length === 0;

  return (
    <>
      <h5 className=" py-5 text-2xl text-main-100">Solicitudes aceptadas</h5>

      <div className="grid grid-cols-3">
        {empty ? (
          <h1 className="col-span-3 text-center">
            <br />
            No hay solicitudes aprobadas.
          </h1>
        ) : (
          applicationByStatusID?.map((element: any) => (
            <RequestCard
              key={element.id}
              image={back}
              proyectTile={element.title}
              announcement={element.citation.title}
              userName={element.user.name}
              userFirstName={element.user.first_lastname}
              userLastName={element.user.second_lastname}
              label={exampleLabels}
              buttonText="Dar seguimiento"
              color="#50245C"
            />
          ))
        )}
      </div>
    </>
  );
};

export default ApplicationAccepted;

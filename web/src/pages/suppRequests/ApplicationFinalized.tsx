// (c) Tecnologico de Monterrey 2022, rights reserved.

import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import {
  ApplicationFinalizedQuery,
  ApplicationFinalizedQuery$data,
} from "./__generated__/ApplicationFinalizedQuery.graphql";
import RequestMap from "../../components/RequestCard/RequestMap";
import { useState } from "react";
import FilterByLabels from "../../components/Filter/FilterByLabels";

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
          labels {
            id
            label_name
          }
        }
        labels {
          id
          label_name
        }
      }
    `,
    { application_status_id: "6" },
    { fetchPolicy: "network-only" },
  );

  const { applicationByStatusID, labels } = data;
  const empty: boolean = applicationByStatusID?.length === 0;
  const [selected, setSelected] = useState<string>("");

  const updateApplications = applicationByStatusID?.filter((application: any) =>
    new Set(application.labels.map((label: any) => label.id)).has(selected),
  );

  const labelExists = new Set(
    applicationByStatusID?.flatMap((element: any) => element.labels?.map((label: any) => label.id)),
  )?.has(selected);

  const handleChange: any = (event: any) => {
    return setSelected(event.target.value);
  };

  if (empty) {
    return (
      <h1 className="col-span-3 text-center">
        <br />
        No hay solicitudes.
      </h1>
    );
  }

  if (selected === "") {
    return (
      <>
        <h5 className="py-5 text-2xl text-main-100">Solicitudes enviadas</h5>
        {
          <select
            id={"Etiquetas"}
            className={
              "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            }
            value={selected}
            onChange={handleChange}
          >
            <option selected={true} value={""}>
              Todos
            </option>
            {labels?.map((element: any) => (
              <FilterByLabels label={element} key={element.id}></FilterByLabels>
            ))}
          </select>
        }
        <div className="grid grid-cols-3">
          {applicationByStatusID?.map((element: any) => (
            <RequestMap
              key={element.id}
              text={"Revisar documentos"}
              color={"#50245C"}
              link={`/app/applications/reviewdocuments/${String(element.id)}`}
              element={element}
            ></RequestMap>
          ))}
        </div>
      </>
    );
  }

  if (labelExists) {
    return (
      <>
        <h5 className="py-5 text-2xl text-main-100">Solicitudes enviadas</h5>
        {
          <select
            id={"Etiquetas"}
            className={
              "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            }
            value={selected}
            onChange={handleChange}
          >
            <option selected={true} value={""}>
              Todos
            </option>
            {labels?.map((element: any) => (
              <FilterByLabels label={element} key={element.id}></FilterByLabels>
            ))}
          </select>
        }
        <div className="grid grid-cols-3">
          {updateApplications?.map((element: any) => (
            <RequestMap
              key={element.id}
              text={"Revisar documentos"}
              color={"#50245C"}
              link={`/app/applications/reviewdocuments/${String(element.id)}`}
              element={element}
            ></RequestMap>
          ))}
        </div>
      </>
    );
  } else {
    return (
      <>
        <h5 className="py-5 text-2xl text-main-100">Solicitudes enviadas</h5>
        {
          <select
            id={"Etiquetas"}
            className={
              "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            }
            value={selected}
            onChange={handleChange}
          >
            <option selected={true} value={""}>
              Todos
            </option>
            {labels?.map((element: any) => (
              <FilterByLabels label={element} key={element.id}></FilterByLabels>
            ))}
          </select>
        }
        <div className="grid grid-cols-3">
          <h1 className="col-span-3 text-center">
            <br />
            No hay solicitudes con esta etiqueta
          </h1>
        </div>
      </>
    );
  }
};

export default ApplicationFinalized;

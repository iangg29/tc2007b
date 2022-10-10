// (c) Tecnologico de Monterrey 2022, rights reserved.

import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import { ApproveDocQuery, ApproveDocQuery$data } from "./__generated__/ApproveDocQuery.graphql";
import RequestMap from "../../components/RequestCard/RequestMap";
import { useState } from "react";
import FilterByLabelsMap from "../../components/Filter/FilterByLabelsMap";

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
          labels {
            id
            label_name
          }
        }
      }
    `,
    { application_status_id: "2" },
    { fetchPolicy: "network-only" },
  );

  const { applicationByStatusID } = data;
  const empty: boolean = applicationByStatusID?.length === 0;
  const [selected, setSelected] = useState<string>("");

  const updateApplications = applicationByStatusID?.filter((application: any) =>
    new Set(application.labels.map((label: any) => label.id)).has(selected),
  );

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChange = (event: any) => {
    setSelected(event.target.value);
  };

  return (
    <>
      <h5 className=" py-5 text-2xl text-main-100">Solicitudes para revisión de documentos</h5>
      {empty ? (
        <h1 className="col-span-3 text-center">
          <br />
          No hay solicitudes.
        </h1>
      ) : (
        <select
          id={"Etiquetas"}
          className={
            "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          }
          value={selected}
          onChange={handleChange}
        >
          <option selected={true}>Todas</option>
          {applicationByStatusID?.map((element: any) => (
            <FilterByLabelsMap element={element} key={element.labels.id}></FilterByLabelsMap>
          ))}
        </select>
      )}
      <div className="grid grid-cols-3">
        {selected === ""
          ? applicationByStatusID?.map((element: any) => (
              <RequestMap
                key={element.id}
                text={"Revisar documentos"}
                color={"#50245C"}
                link={`/app/applications/reviewdocuments/${String(element.id)}`}
                element={element}
              ></RequestMap>
            ))
          : updateApplications?.map((element: any) => (
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
};

export default ApproveDoc;

// (c) Tecnologico de Monterrey 2022, rights reserved.

import CheckboxDocument from "./CheckboxDocument";
import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { DocumentListQuery, DocumentListQuery$data } from "./__generated__/DocumentListQuery.graphql";

const DocumentList = (): JSX.Element => {
  const data: DocumentListQuery$data = useLazyLoadQuery<DocumentListQuery>(
    graphql`
      query DocumentListQuery {
        documentTypes {
          id
          name
        }
      }
    `,
    {},
  );

  const { documentTypes } = data;

  console.debug(documentTypes);

  return (
    <>
      <div>
        <div className="mx-7 my-5 flex flex-col px-52 ">
          <h1 className="text-2xl font-semibold text-main-500">Documentos Necesarios</h1>
          {documentTypes?.map((element: any) => (
            <CheckboxDocument key={element.id} name={element.name} id={element.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default DocumentList;

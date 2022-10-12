// (c) Tecnologico de Monterrey 2022, rights reserved.
import graphql from "babel-plugin-relay/macro";
import { Modal } from "flowbite-react";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { useForm } from "react-hook-form";
import useChecked from "../../hooks/useChecked";
import DocumentList from "../DocumentList/DocumentList";
import { EditModalQuery, EditModalQuery$data } from "./__generated__/EditModalQuery.graphql";
import { EditModal2Query, EditModal2Query$data } from "./__generated__/EditModal2Query.graphql";
import { EditModalMutation } from "./__generated__/EditModalMutation.graphql";
import Swal from "sweetalert2";

interface params {
  show: boolean;
  onClose: any;
  header: string;
  title?: string;
  date?: string;
  image?: string | undefined;
  citationId: string;
}

interface documentTypeType {
  id: string | undefined;
  name: string | undefined;
  isChecked: boolean;
}

interface EditForm {
  title: string;
  description: string;
  date: string;
  doChangeProps: string;
}

const EditModal = ({ show, onClose, title, date, image, header, citationId }: params): JSX.Element => {
  const today = new Date();
  const todayDate =
    today.getFullYear().toString() +
    "-" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    today.getDate().toString().padStart(2, "0");

  const data: EditModalQuery$data = useLazyLoadQuery<EditModalQuery>(
    graphql`
      query EditModalQuery {
        documentTypes {
          id
          type_name
        }
      }
    `,
    { fetchPolicy: "network-only" },
  );

  const dataDocs: EditModal2Query$data = useLazyLoadQuery<EditModal2Query>(
    graphql`
      query EditModal2Query($id: ID!) {
        citationDocuments(id: $id) {
          id
          type_name
        }
      }
    `,
    { id: citationId },
    { fetchPolicy: "network-only" },
  );

  const [commitMutation] = useMutation<EditModalMutation>(
    graphql`
      mutation EditModalMutation(
        $id: ID!
        $citation_title: String!
        $citation_description: String!
        $end_date: String!
        $document_types: [ID]!
      ) {
        updateCitation(
          id: $id
          citation_title: $citation_title
          citation_description: $citation_description
          end_date: $end_date
          document_types: $document_types
        ) {
          citation_title
        }
      }
    `,
  );

  const { register, handleSubmit, getValues } = useForm<EditForm>();

  const { documentTypes } = data;
  const { citationDocuments } = dataDocs;

  console.debug(documentTypes);
  console.debug(citationDocuments);

  const currentDocs: any = citationDocuments?.map((item: any) => {
    const newItem: any = item.id;
    return newItem;
  });

  const initialState: any = documentTypes?.map((item: any): documentTypeType | undefined => {
    const newItem: documentTypeType | undefined = {
      ...item,
      isChecked: currentDocs?.includes(item.id),
    };
    return newItem;
  });

  const [list, handleclickCheckbox] = useChecked(initialState);
  const docType = list
    ?.filter((element: any) => element.isChecked === true)
    .map((filteredElement: any) => {
      const newElement: any = filteredElement.id;
      return newElement;
    });

  console.debug("docType", docType);

  const onSubmitForm = (): void => {
    const docType = list
      ?.filter((element: any) => element.isChecked === true)
      .map((filteredElement: any) => {
        const newElement: any = filteredElement.id;
        return newElement;
      });

    const myTitle = getValues("title");
    const myDescription = getValues("description");
    const myDate = getValues("date");

    if (docType?.length !== 0) {
      commitMutation({
        variables: {
          id: citationId as unknown as string,
          citation_title: myTitle as unknown as string,
          citation_description: myDescription as unknown as string,
          end_date: myDate as unknown as string,
          document_types: docType as unknown as [string],
        },
        onCompleted: () => {
          window.location.href = "/app/home";
        },
        onError: () => {
          console.log("error :(");
          console.log(docType);
        },
      });
    } else {
      void Swal.fire({
        title: "Error",
        icon: "error",
        text: "Verifica tus campos de entrada.",
        customClass: {
          container: "swal2-container",
        },
      });
    }
  };

  const onError = (): any =>
    Swal.fire({
      title: "Error",
      icon: "error",
      text: "Verifica tus campos de entrada.",
      customClass: {
        container: "swal2-container",
      },
    });

  return (
    <>
      <Modal show={show} onClose={onClose}>
        <Modal.Header> {header} </Modal.Header>
        <form
          onSubmit={(e) => {
            handleSubmit(onSubmitForm, onError)(e).catch(() => {});
          }}
        >
          <Modal.Body>
            <div className="space-y-6">
              <div className="mb-3">
                {image !== undefined && (
                  <img
                    className="container relative mx-auto max-w-xs h-auto rounded-xl"
                    src={image}
                    alt="image description"
                  />
                )}
              </div>
              <div className="max-w-fit mx-auto grid grid-cols-2 place-content-center">
                <div className="px-8">
                  <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Titulo</label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      defaultValue={title}
                      type="text"
                      id="title"
                      {...register("title", {
                        required: true,
                        pattern: { value: /^\S+[a-zA-Z\s]*/, message: "error message" },
                      })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block mb-2 py-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Imagen
                    </label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      defaultValue={image}
                      type="text"
                      id="description"
                      {...register("description", {
                        required: true,
                        pattern: { value: /^\S+[a-zA-Z\s]*/, message: "error message" },
                      })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fecha fin</label>
                    <input
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      defaultValue={date}
                      {...register("date", {
                        required: true,
                        validate: {
                          date_check: (v) => v >= todayDate,
                        },
                      })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Archivo .PDF
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      aria-describedby="file_input_help"
                      id="file_input"
                      type="file"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Documentos necesarios
                  </label>
                  <DocumentList list={list} handleclickCheckbox={handleclickCheckbox} />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="bg-main-500 hover:bg-main-500/70 ease-in-out duration-500 font-bold text-white rounded-md py-2 px-2 text-sm mt-5"
              type="submit"
            >
              Aceptar
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-500/70 ease-in-out duration-500 font-bold text-white rounded-md py-2 px-2 text-sm mt-5"
              onClick={onClose}
            >
              Cancelar
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditModal;

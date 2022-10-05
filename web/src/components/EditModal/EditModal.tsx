// (c) Tecnologico de Monterrey 2022, rights reserved.
import graphql from "babel-plugin-relay/macro";
import { Modal } from "flowbite-react";
import { useLazyLoadQuery } from "react-relay";
import useChecked from "../../hooks/useChecked";
import DocumentList from "../DocumentList/DocumentList";
import { EditModalQuery, EditModalQuery$data } from "./__generated__/EditModalQuery.graphql";

interface params {
  show: boolean;
  onClose: any;
  header: string;
  name?: string;
  date?: string;
  image?: string | undefined;
}

interface documentTypeType {
  id: string | undefined;
  name: string | undefined;
  isChecked: boolean;
}

const EditModal = ({ show, onClose, name, date, image, header }: params): JSX.Element => {
  const data: EditModalQuery$data = useLazyLoadQuery<EditModalQuery>(
    graphql`
      query EditModalQuery {
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

  const initialState: any = documentTypes?.map((item: any): documentTypeType | undefined => {
    const newItem: documentTypeType | undefined = { ...item, isChecked: false };
    return newItem;
  });

  const [list, handleclickCheckbox] = useChecked(initialState);
  const docType = list
    ?.filter((element: any) => element.isChecked === true)
    .map((filteredElement: any) => {
      const newElement: any = filteredElement.id;
      return newElement;
    });
  console.log("list", list);
  console.log("docType", docType);

  return (
    <>
      <Modal show={show} onClose={onClose}>
        <Modal.Header> {header} </Modal.Header>
        <Modal.Body>
          <>
            <div className="space-y-6">
              <form>
                <div className="mb-3">
                  {image !== undefined && (
                    <img
                      className="container relative mx-auto max-w-xs h-auto rounded-lg"
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
                        defaultValue={name}
                        type="text"
                        id="title"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block mb-2 py-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Descripción
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        defaultValue={image}
                        type="text"
                        id="title"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Fecha fin
                      </label>
                      <input
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        defaultValue={date}
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
              </form>
            </div>
          </>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-main-500 hover:bg-main-500/70 ease-in-out duration-500 font-bold text-white rounded-md py-2 px-2 text-sm mt-5"
            onClick={onClose}
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
      </Modal>
    </>
  );
};

export default EditModal;

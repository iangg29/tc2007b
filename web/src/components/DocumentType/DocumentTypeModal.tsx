// (c) Tecnologico de Monterrey 2022, rights reserved.
import { useMutation } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import { Modal } from "flowbite-react";
import { useState } from "react";

interface params {
  show: boolean;
  onClose: any;
}

const DocumentTypeModal = ({ show, onClose }: params): JSX.Element => {
  const [docTypeNameVariable, setDocTypeNameVar] = useState<string>("");

  const [commitMutation] = useMutation(
    graphql`
      mutation DocumentTypeModalMutation($type_name: String!) {
        createDocumentType(type_name: $type_name) {
          id
          type_name
        }
      }
    `,
  );

  const handleSubmit = (): void => {
    commitMutation({
      variables: {
        type_name: docTypeNameVariable as unknown as string,
      },
      onCompleted: () => {
        window.location.href = "/app/newannouncement";
      },
      onError: () => {
        console.log("error");
      },
    });
  };

  return (
    <>
      <Modal show={show} onClose={onClose}>
        <Modal.Header> {"Agragar tipo de documento"} </Modal.Header>

        <Modal.Body>
          <div className="space-y-6">
            <div className="flex space-x-6 max-w-fit mx-auto mb-3 px-8">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Nombre del nuevo documento:
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={""}
                onChange={(e) => setDocTypeNameVar(e.target.value)}
                type="text"
                id="documentTypeName"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-main-500 hover:bg-main-500/70 ease-in-out duration-500 font-bold text-white rounded-md py-2 px-2 text-sm mt-5"
            onClick={handleSubmit}
            type="button"
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

export default DocumentTypeModal;

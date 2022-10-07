// (c) Tecnologico de Monterrey 2022, rights reserved.
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useMutation } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { DeleteModalMutation } from "./__generated__/DeleteModalMutation.graphql";

interface params {
  show: boolean;
  onClose: any;
  name: string;
  citationId: string;
}

const DeleteModal = ({ show, onClose, name, citationId }: params): JSX.Element => {
  const [commitMutation] = useMutation<DeleteModalMutation>(
    graphql`
      mutation DeleteModalMutation($id: ID!) {
        deleteCitation(id: $id)
      }
    `,
  );

  return (
    <>
      <Modal show={show} size="md" popup={true} onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              ¿Estás seguro de que deseas borrar <strong>{name}</strong>?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-700 hover:bg-red-700/70 ease-in-out duration-500 font-bold text-white rounded-md py-2 px-2 text-sm mt-5"
                onClick={() => {
                  commitMutation({
                    variables: {
                      id: citationId as unknown as string,
                    },
                    onCompleted: () => {
                      window.location.href = "/app/home";
                    },
                    onError: () => {
                      console.log("error :(");
                    },
                  });
                }}
              >
                Aceptar
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-500/70 ease-in-out duration-500 font-bold text-white rounded-md py-2 px-2 text-sm mt-5"
                onClick={onClose}
              >
                Cancelar
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteModal;

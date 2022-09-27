// (c) Tecnologico de Monterrey 2022, rights reserved.
import { Modal } from "flowbite-react";

interface params {
  show: boolean;
  onClose: any;
  props: any;
  header: string;
}

const ReqModal = ({ show, onClose, props, header }: params): JSX.Element => {
  return (
    <>
      <Modal show={show} onClose={onClose}>
        <Modal.Header> {header} </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">{props}</div>
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

export default ReqModal;
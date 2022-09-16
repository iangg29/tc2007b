// (c) Tecnologico de Monterrey 2022, rights reserved.
import { Modal } from "flowbite-react";
import EditForm from "../EditForm/EditForm";
import PropTypes from "prop-types";

interface params {
  show: boolean;
  onClose: any;
  props: any;
}

const EditModal = ({ show, onClose, props }: params): JSX.Element => {
  return (
    <>
      <Modal show={show} onClose={onClose}>
        <Modal.Header>Editar Convocatoria</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <EditForm name={props.name} date={props.date} />
          </div>
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
            Rechazar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

EditModal.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
};

export default EditModal;

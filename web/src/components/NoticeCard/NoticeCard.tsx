// (c) Tecnologico de Monterrey 2022, rights reserved.
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { BsFillTrashFill } from "react-icons/bs";
import SvgButton from "../SvgButton/SvgButton";
import EditModal from "../EditModal/EditModal";
import DeleteModal from "../DeleteModal/DeleteModal";

interface params {
  img: string;
  name: string;
  date: string;
  id: string;
}

const NoticeCard = ({ img, name, date, id }: params): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  const handleShow = (): void => setShow(true);
  const onClose = (): void => setShow(false);

  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = (): void => {
    setShowDelete(true);
  };
  const onCloseDelete = (): void => {
    setShowDelete(false);
  };

  return (
    <>
      <div className="my-10 flex w-10/12 flex-col bg-white rounded-2xl shadow-xl shadow-slate-300/60 border border-b-slate-300">
        <img className="aspect-video w-full rounded-t-2xl object-cover object-center" src={img} />
        <div className="p-4 border border-transparent border-t-slate-300/60">
          <h1 className="text-2xl font-medium text-slate-600 pb-2">{name}</h1>
          <small className="text-gray-400 text-xs">Fecha fin: {date.split(" ")[0]}</small>
          <div className="flex justify-end">
            <SvgButton svgfile={<FiEdit />} method={handleShow} />
            <div className="mx-1 flex flex-col">
              <SvgButton svgfile={<BsFillTrashFill />} method={handleShowDelete} />
            </div>
          </div>
        </div>
      </div>
      <EditModal
        show={show}
        onClose={onClose}
        header={"Editar Convocatoria"}
        title={name}
        date={date}
        image={img}
        citationId={id}
      />
      <DeleteModal name={name} show={showDelete} onClose={onCloseDelete} citationId={id} />
    </>
  );
};

export default NoticeCard;

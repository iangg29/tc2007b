// (c) Tecnologico de Monterrey 2022, rights reserved.
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { BsFillTrashFill } from "react-icons/bs";
import SvgButton from "./SvgButton";
import EditModal from "./EditModal";

interface params {
  img: string;
  name: string;
  date: string;
}

const NoticeCard = ({ img, name, date }: params): JSX.Element => {
  const [show, setShow] = useState(false);
  const handleShow = (): void => setShow(true);
  const onClose = (): void => setShow(false);

  const alertaBorrar = (): any => {
    alert("Se está borrando");
  };

  return (
    <>
      <div className="mx-8 my-8 flex w-96 flex-col bg-white rounded-2xl shadow-xl shadow-slate-300/60">
        <img className="aspect-video w-96 rounded-t-2xl object-cover object-center" src={img} />
        <div className="p-4">
          <h1 className="text-2xl font-medium text-slate-600 pb-2">{name}</h1>
          <small className="text-gray-400 text-xs">Fecha fin: {date}</small>
          <div className="flex justify-end">
            <SvgButton svgfile={<FiEdit />} method={handleShow} />
            <div className="mx-1 flex flex-col">
              <SvgButton svgfile={<BsFillTrashFill />} method={alertaBorrar} />
            </div>
          </div>
        </div>
      </div>
      <EditModal show={show} onClose={onClose} />
    </>
  );
};

export default NoticeCard;

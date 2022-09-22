// (c) Tecnologico de Monterrey 2022, rights reserved.

import Foot from "../../pages/includes/Footer";
import NavBar from "../../pages/includes/NavBar";
import DocumentList from "../DocumentList/DocumentList";
import SubmitDocument from "../SubmitDocument/SubmitDocument";

const NewAnnouncementForm = (): JSX.Element => {
  return (
    <>
      <div>
        <NavBar />
        <div className="flex  w-full h-screen">
          <div className="Titulo-Principal flex row-span-1">
            <div className="mx-7 my-5 flex flex-col">
              <h1 className="text-4xl font-semibold text-main-500">Nueva Convocatoria</h1>
            </div>
          </div>
          <SubmitDocument />
          <DocumentList />
          {/* Boton para crear la convocatoria */}
          <div className="flex-wrap">
            <div className="flex flex-col mx-auto">
              <button className="w-36 bg-main-500 hover:bg-main-500/70  hover:scale-105 transition-all ease-in-out duration-500 active:scale-95 font-bold text-white rounded-3xl py-2 text-sm mt-5">
                Crear
              </button>
            </div>
          </div>
        </div>
        <Foot />
      </div>
    </>
  );
};

export default NewAnnouncementForm;

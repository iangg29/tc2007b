// (c) Tecnologico de Monterrey 2022, rights reserved.

import { useState } from "react";
import DocumentList from "../DocumentList/DocumentList";

const NewAnnouncementForm = (): JSX.Element => {
  const [tittle, setTittle] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const AnnouncementData = (): void => {
    console.log(tittle);
    console.log(date);
  };

  return (
    <>
      <div>
        <div className="TituloPrincipal flex row-span-1 px-11">
          <div className="mx-7 my-5 flex">
            <h1 className="text-4xl font-semibold text-main-500">Nueva Convocatoria</h1>
          </div>
        </div>
        <div className="w-10/12 mx-10 grid grid-cols-2 place-content-center">
          <div className="SubmitDocumentForm px-8">
            <form>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Nombre Convocatoria
                </label>

                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  id="title"
                  autoComplete="off"
                  name="title"
                  onChange={(ev) => setTittle(ev.target.value)}
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Fecha Fin Convocatoria
                </label>

                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  id="date"
                  placeholder="Seleccione la fecha"
                  autoComplete="off"
                  name="date"
                  onChange={(ev) => setDate(ev.target.value)}
                />
              </div>
            </form>

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="default_size">
              PDF Convocatoria
            </label>

            <input
              className="block mb-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="default_size"
              type="file"
            ></input>
          </div>

          <DocumentList />
        </div>
        <br />
        <br />
        <div className="flex flex-col mx-auto content-center items-center">
          <button
            className="w-48 bg-main-500 hover:bg-main-500/70  hover:scale-105 transition-all ease-in-out duration-500 active:scale-95 font-bold text-white rounded-3xl py-2 text-sm mt-5"
            type="submit"
            onClick={AnnouncementData}
          >
            Crear
          </button>
        </div>
      </div>
    </>
  );
};

export default NewAnnouncementForm;

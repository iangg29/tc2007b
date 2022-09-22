// (c) Tecnologico de Monterrey 2022, rights reserved.

import React from "react";

const SubmitDocument = (): JSX.Element => {
  return (
    <>
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
              autoComplete="off"
              name="date"
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
    </>
  );
};

export default SubmitDocument;

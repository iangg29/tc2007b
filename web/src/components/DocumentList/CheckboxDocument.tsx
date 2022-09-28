// (c) Tecnologico de Monterrey 2022, rights reserved.

import React from "react";

interface params {
  id: string;
  name: string;
  isChecked: boolean;
  setChecked: Function;
}

const CheckboxDocument = ({ name, isChecked, id, setChecked }: params): JSX.Element => {
  return (
    <>
      <div className="flex items-center mt-3">
        <input
          id={id}
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setChecked(e)}
          className="w-4 h-4 text-blue-600 bg-gray-100 rounded
              border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2
              dark:bg-gray-700 dark:border-gray-600"
        ></input>
        <label htmlFor="default-checkbox" className="ml-2 text- font-medium text-gray-900 dark:text-gray-300">
          {name}
        </label>
      </div>
    </>
  );
};

export default CheckboxDocument;

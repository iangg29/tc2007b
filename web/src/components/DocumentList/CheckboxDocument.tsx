// (c) Tecnologico de Monterrey 2022, rights reserved.

import { useRef } from "react";

interface params {
  id: string;
  name: string;
}

const CheckboxDocument = ({ name, id }: params): JSX.Element => {
  const myRef = useRef<HTMLInputElement | null>(null);

  function test(): void {
    console.log(myRef?.current?.checked);
    console.log(myRef?.current?.id);
  }

  return (
    <>
      <div className="flex items-center mt-3">
        <input
          ref={myRef}
          id={id}
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 rounded
              border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2
              dark:bg-gray-700 dark:border-gray-600"
          onClick={() => test()}
        ></input>
        <label htmlFor="default-checkbox" className="ml-2 text- font-medium text-gray-900 dark:text-gray-300">
          {name}
        </label>
      </div>
    </>
  );
};

console.log();

export default CheckboxDocument;

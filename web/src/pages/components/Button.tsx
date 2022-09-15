// (c) Tecnologico de Monterrey 2022, rights reserved.
import { MouseEventHandler } from "react";

interface params {
  text: string;
  method: MouseEventHandler;
}
const Button = ({ text, method }: params): JSX.Element => {
  return (
    <>
      <button
        onClick={method}
        className="bg-main-500 hover:bg-main-500/70 ease-in-out duration-500 font-bold text-white rounded-md py-2 px-2 text-sm mt-5"
      >
        {text}
      </button>
    </>
  );
};

export default Button;

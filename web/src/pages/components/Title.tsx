// (c) Tecnologico de Monterrey 2022, rights reserved.
import Button from "./Button";
import { MouseEventHandler } from "react";

interface params {
  text: string;
  method: MouseEventHandler;
}

const Title = ({ text, method }: params): JSX.Element => {
  return (
    <>
      <div className="flex row-span-1">
        <div className="mx-7 my-5 flex flex-col">
          <h1 className="text-4xl font-semibold text-main-500">{text}</h1>
        </div>
        <div className="mx-7 my-1 flex flex-col">
          <Button text={"+ Nueva Convocatoria"} method={method} />
        </div>
      </div>
    </>
  );
};

export default Title;

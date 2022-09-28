// (c) Tecnologico de Monterrey 2022, rights reserved.
import { MouseEventHandler } from "react";
import { IconContext } from "react-icons";

interface params {
  svgfile: any;
  method: MouseEventHandler;
}

const SvgButton = ({ svgfile, method }: params): JSX.Element => {
  return (
    <div className="mx-1 flex flex-col">
      <button onClick={method}>
        <IconContext.Provider value={{ color: "#2d64a3", size: "25" }}>{svgfile}</IconContext.Provider>
      </button>
    </div>
  );
};

export default SvgButton;

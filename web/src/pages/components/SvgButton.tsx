// (c) Tecnologico de Monterrey 2022, rights reserved.
import { IconContext } from "react-icons";

const SvgButton = ({ svgfile }: any): JSX.Element => {
  return (
    <div className="mx-1 flex flex-col">
      <button>
        <IconContext.Provider value={{ color: "#2d64a3", size: "25" }}>{svgfile}</IconContext.Provider>
      </button>
    </div>
  );
};

export default SvgButton;

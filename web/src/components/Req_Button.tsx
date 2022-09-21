// (c) Tecnologico de Monterrey 2022, rights reserved.
import { useNavigate } from "react-router-dom";

interface Props {
  text: string;
  navigate: string;
}

const ReqButton = ({ text, navigate }: Props): JSX.Element => {
  const nav = useNavigate();

  return (
    <>
      <button
        onClick={() => nav(navigate)}
        className="px-4 py-2 drop-shadow-md rounded-full bg-main-500 text-sm md:text-xs lg:text-sm text-white"
      >
        {text}
      </button>
    </>
  );
};

export default ReqButton;

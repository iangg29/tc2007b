// (c) Tecnologico de Monterrey 2022, rights reserved.
import { AiFillFile, AiFillEye } from "react-icons/ai";

interface Props {
  filename: string | undefined;
  updated: string | undefined;
  link: string | undefined;
}

const DocumentReview = ({ filename, updated, link }: Props): JSX.Element => {
  return (
    <div className="w-fit flex flex-row space-x-4 pt-4 pb-4 border-b-2">
      <div className="w-[300px] md:w-[250px] lg:w-[250px] flex items-center gap-2">
        <div className="w-[32px]">
          <AiFillFile size={30} color="#252d53" />
        </div>
        <p className="text-base">{filename}</p>
      </div>
      <div className="w-fit flex items-center gap-2 justify-start lg:justify-center bg-white">
        <p className="hidden md:block font-light text-xs">{updated}</p>
        <div className="w-[35px] pl-1">
          <a href={link} target="noopener">
            <AiFillEye size={30} color="#252d53" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DocumentReview;

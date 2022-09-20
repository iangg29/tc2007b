import React from "react";

interface Props {
  text: string;
}

const ReqButton = ({ text }: Props): JSX.Element => {
  return (
    <div>
      <button className="px-4 py-2 drop-shadow-md rounded-full bg-main-500 text-sm md:text-xs lg:text-sm text-white">
        {text}
      </button>
    </div>
  );
};

export default ReqButton;

// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import SingleTag from "./SingleTag";

interface Props {
  image: string;
  proyectTile: string;
  announcement: string;
  user: string;
  label: object[];
  buttonText: String;
}

const RequestCard = ({ image, proyectTile, announcement, user, label, buttonText }: Props): JSX.Element => {
  let button;

  buttonText === "Revisar"
    ? (button = "bg-button-300 rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-hover-300 ")
    : buttonText === "Dar seguimiento"
    ? (button = "bg-button-200 rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-hover-200 ")
    : buttonText === "Revisar nuevamente"
    ? (button = "bg-button-100 rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-hover-100 ")
    : (button = "bg-main-500 rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-main-50 ");

  return (
    <>
      <div className="max-w-sm py-5">
        <Card imgAlt="" imgSrc={image}>
          <div className="grid grid-cols-2">
            <div className="flex flex-col space-y-2">
              <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{proyectTile}</h5>
              <h5 className="text-l font-semibold tracking-tight text-gray-900 dark:text-white">{announcement}</h5>
              <br />
              <h5 className="text-xs font-semibold tracking-tight text-gray-900 dark:text-white">
                Realizado por: {user}
              </h5>
            </div>

            <div className="flex flex-col space-y-2 items-center justify-between ">
              {label.map((element, index) => (
                <SingleTag key={index} element={element} />
              ))}

              <br />
              <a className={button}>
                <Link to={""}>{buttonText}</Link>
              </a>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default RequestCard;

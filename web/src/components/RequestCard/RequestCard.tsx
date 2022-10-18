// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import SingleTag from "./SingleTag";

interface labels {
  id: string;
  label_name: String;
}

interface Props {
  image: string;
  proyectTile?: string;
  announcement: string;
  userName: string;
  userFirstName: string;
  userLastName: string;
  label: labels[];
  buttonText: String;
  color: string;
  btnLink: string;
}

const RequestCard = ({
  image,
  proyectTile,
  announcement,
  userName,
  userFirstName,
  userLastName,
  label,
  buttonText,
  color,
  btnLink,
}: Props): JSX.Element => {
  const user = `${userName} ${userFirstName} ${userLastName}`;

  const empty = label?.length === 0;

  return (
    <>
      <div className="max-w-sm py-5">
        <Card imgAlt="" imgSrc={image}>
          <div className="space-y-1">
            <div className="flex flex-col space-y-2 ">
              <div className=" bg-slate-300	 rounded-md px-2">
                <h5 className="text-md tracking-tight text-gray-900 dark:text-white">{"Proyecto:"}</h5>
                <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">{proyectTile}</h5>
              </div>
              <div className=" bg-slate-300	 rounded-md px-2">
                <h5 className="text-md tracking-tight text-gray-900 dark:text-white">{"Convocatoria:"}</h5>
                <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">{announcement}</h5>
              </div>
              <div className=" bg-slate-300	 rounded-md px-2">
                <h5 className="text-s tracking-tight text-gray-900 dark:text-white">{"Solicitante:"}</h5>
                <h5 className="text-s font-semibold italic tracking-tight text-gray-900 dark:text-white">{user}</h5>
              </div>
            </div>

            <div className="flex flex-row space-y-2 items-center justify-between ">
              <h5 className="text-md tracking-tight text-gray-900 dark:text-white">{"Categorías:"}</h5>
              {empty ? (
                <p className="text-sm tracking-tight text-gray-900 dark:text-white">Sin categorías relacionadas</p>
              ) : (
                label?.map((element: any) => <SingleTag key={element.id} element={element.label_name} />)
              )}
              <br />
            </div>
            <div>
              <button
                className="rounded-lg mt-2 px-5 py-2 text-center text-sm font-medium text-white hover:scale-110"
                style={{ backgroundColor: color }}
              >
                <Link to={btnLink}>{buttonText}</Link>
              </button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default RequestCard;

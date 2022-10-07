// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import SingleTag from "./SingleTag";

interface labels {
  id: string;
  name: String;
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
  const user = `${userName} ${userFirstName}`;

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
              {label?.map((element: any) => (
                <SingleTag key={element.id} element={element.label_name} />
              ))}

              <br />
              <button
                className="rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white hover:scale-110"
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

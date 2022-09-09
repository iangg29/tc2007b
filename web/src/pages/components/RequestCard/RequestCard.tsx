// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Card } from "flowbite-react";
import SingleTag from "./SingleTag";

interface Props {
  image: any;
  proyectTile: string;
  announcement: string;
  user: string;
  label: any[];
}

const RequestCard = ({ image, proyectTile, announcement, user, label }: Props): JSX.Element => {
  return (
    <>
      <div className="max-w-sm py-5">
        <Card imgAlt="Apple Watch Series 7 in colors pink, silver, and black" imgSrc={image}>
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
              <a
                href="#"
                className="rounded-lg bg-main-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Revisar
              </a>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default RequestCard;

// (c) Tecnologico de Monterrey 2022, rights reserved.

import { useEffect, useState } from "react";
import ProfileLabel from "./ProfileLabel";
import { fieldValue, profileInfo } from "./ProfileTypes";

interface ProfileProps {
  info: any;
  image: string;
}

const ProfileInfo = ({ info, image }: ProfileProps): JSX.Element => {
  const objectToList = (obj: profileInfo): fieldValue[] => {
    const list: fieldValue[] = [];
    const result = Object.entries(obj);
    result.forEach((element) => {
      list.push({ field: element[0], value: element[1] });
    });
    return list;
  };

  const [data, setData] = useState<fieldValue[]>([]);

  useEffect(() => {
    setData(objectToList(info));
  }, [data]);

  return (
    <div className="w-11/12 mt-10 mx-auto pb-10">
      <h1 className="text-sky-900	text-6xl font-bold">Perfil de usuario</h1>
      <div className="flex flex-row justify-center item-center pt-10">
        <div className="col-span-1  h-full px-32 py-10">
          <img className="rounded-full border-[50px] border-gray-200 w-100 h-100 mx-auto mb-2 " src={image} />
        </div>

        <div className="flex flex-col w-[800px] pl-32 border-l-4 border-black">
          {data.map((item, index) => (
            <ProfileLabel key={index} field={item.field} value={item.value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;

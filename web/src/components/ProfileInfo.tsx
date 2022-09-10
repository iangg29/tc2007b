// (c) Tecnologico de Monterrey 2022, rights reserved.

import { useState } from "react";
import ProfileLabel from "./ProfileLabel";

const ProfileInfo = (): JSX.Element => {
  const initProfile = {
    user: "",
    name: "",
    phone: null,
    email: "",
    password: "",
    image:
      "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg",
  };

  const list = [
    {
      asunto: "Asunto1",
      value: "Valor1",
    },
    {
      asunto: "Asunto2",
      value: "Valor2",
    },
  ];

  const [data, setData] = useState(initProfile);

  return (
    <div className="w-11/12 mx-auto my-auto">
      <h1 className="text-sky-900	text-left	text-4xl scroll-mx-px	mt-4 mb-4 ">Perfil de Usuario</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1	border-r-4 border-black ">
          <img
            className="rounded-full border-4 border-white md:w-20 w-16 h-16 md:h-20 mx-auto mt-2 mb-2"
            src={data.image}
          />
        </div>

        <div className="col-span-2 mx-auto gap-4">
          {list.map((item, index) => (
            <ProfileLabel key={index} asunto={item.asunto} value={item.value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;

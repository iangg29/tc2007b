// (c) Tecnologico de Monterrey 2022, rights reserved.
import React, { useState } from "react";
import logo from "../../assets/logos/logoColorSC.png";

import back from "../../assets/background/login.png";

const Login = (): JSX.Element => {
  const dataInitial = {
    email: "",
    password: "",
  };

  const [form, setForm] = useState(dataInitial);

  const handle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newForm: any = { ...form };
    newForm[e.target.id] = e.target.value;
    setForm(newForm);
  };

  const login = (): void => {};

  return (
    <>
      <div className="relative w-full h-screen">
        <div className=" w-full h-full ">
          <img src={back} className="w-full h-full object-cover object-center" alt="" />
        </div>
        <div className="absolute w-full h-full top-0  z-20 flex items-center justify-center">
          <div className="w-10/12 mx-auto grid grid-cols-2 place-content-center place-items-center">
            <div className="place-self-center border-r-2 border-black/30">
              <img src={logo} className="w-full " />
            </div>
            {/* <div className=" border-l-black/30 border-2 h-96"></div> */}
            <div className=" flex flex-col -ml-24">
              <label className="labelLogin">Correo Electronico</label>
              <input
                className="inputLogin"
                placeholder="example@qro.gob.mx"
                type="email"
                id="email"
                onChange={handle}
              />
              <label className="labelLogin">Contraseña</label>
              <input
                className="inputLogin"
                placeholder="************"
                type="password"
                id="password"
                onChange={handle}
              />
              <label className="self-end text-xs text-main-100 py-1 hover:underline">
                ¿Has olvidado la contraseña?
              </label>
              <div className="flex flex-col mx-auto">
                <button
                  className="w-36 bg-main-500 hover:bg-main-500/70  hover:scale-105 transition-all ease-in-out duration-500 active:scale-95 font-bold text-white rounded-3xl py-2 text-sm mt-5"
                  onClick={login}
                >
                  Iniciar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

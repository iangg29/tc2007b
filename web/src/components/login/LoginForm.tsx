// (c) Tecnologico de Monterrey 2022, rights reserved.
import { useRef } from "react";
import logo from "../../assets/logos/logoColorSC.png";
import back from "../../assets/background/login.png";

interface Form {
  email?: string;
  password?: string;
}

const LoginForm = (): JSX.Element => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const login = (): void => {
    const form: Form = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    alert(`${form.email ?? ""} + ${form.password ?? ""}`);
  };

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
            <div className=" flex flex-col -ml-24">
              <label className="labelLogin">Correo Electronico</label>
              <input className="inputLogin" placeholder="example@qro.gob.mx" type="email" id="email" ref={emailRef} />
              <label className="labelLogin">Contraseña</label>
              <input
                className="inputLogin"
                placeholder="************"
                type="password"
                id="password"
                ref={passwordRef}
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

export default LoginForm;

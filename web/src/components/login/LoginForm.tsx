// (c) Tecnologico de Monterrey 2022, rights reserved.
import { FormEvent, useRef } from "react";
import logo from "../../assets/logos/logoColorSC.png";
import back from "../../assets/background/login.png";
import axios, { AxiosResponse } from "axios";
import { useAppDispatch } from "../../store/hooks";
import { setIsLoggedIn, setToken, setUser } from "../../store/slices/authSlice";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const genLoginToken = async (email: string, password: string): Promise<any> => {
    try {
      await axios
        .post("/auth/login", {
          email,
          password,
        })
        .then((res: AxiosResponse<any>) => {
          const { status, token, message } = res.data;
          if (status === "success") {
            Cookies.set("token", `Bearer ${token as string}`);
            dispatch(setUser(res.data.user));
            dispatch(setToken(token));
            dispatch(setIsLoggedIn(true));
            navigate("/app/home");
          } else {
            void Swal.fire({
              title: "Error",
              icon: "error",
              text: message,
              customClass: {
                container: "swal2-container",
              },
            });
          }
        })
        .catch((error) => {
          console.error(error);
          void Swal.fire({
            title: "Error",
            icon: "error",
            text: "Verifica tus campos de entrada.",
            customClass: {
              container: "swal2-container",
            },
          });
        });
    } catch (error: any) {
      console.error(error);
      void Swal.fire({
        title: "Error",
        icon: "error",
        text: "Verifica tus campos de entrada.",
        customClass: {
          container: "swal2-container",
        },
      });
    }
  };

  const login = (): void => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    (async () => {
      await genLoginToken(email as string, password as string);
    })()
      .then((r) => r)
      .catch((e) => e);
  };

  return (
    <>
      <div className="relative w-full h-screen">
        <div className=" w-full h-full ">
          <img src={back} className="w-full h-full object-cover object-center" alt="" />
        </div>
        <div className="absolute w-full h-full top-0  z-20 flex items-center justify-center">
          <form onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
            <div className="w-10/12 mx-auto grid grid-cols-2 place-content-center place-items-center">
              <div className="place-self-center border-r-2 border-black/30">
                <img src={logo} className="w-full " />
              </div>
              <div className=" flex flex-col -ml-24">
                <label className="labelLogin">Correo Electronico</label>
                <input
                  className="inputLogin"
                  placeholder="example@qro.gob.mx"
                  type="email"
                  id="email"
                  ref={emailRef}
                  autoComplete="email"
                />
                <label className="labelLogin">Contraseña</label>
                <input
                  className="inputLogin"
                  placeholder="************"
                  type="password"
                  autoComplete="current-password"
                  id="password"
                  ref={passwordRef}
                />
                <label className="self-end text-xs text-main-100 py-1 hover:underline">
                  <Link to={"/signup"}>Crear cuenta</Link>
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
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;

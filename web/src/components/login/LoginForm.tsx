// (c) Tecnologico de Monterrey 2022, rights reserved.
import { useRef } from "react";
import logo from "../../assets/logos/logoColorSC.png";
import back from "../../assets/background/login.png";
import graphql from "babel-plugin-relay/macro";
import { useMutation } from "react-relay";
import { LoginFormMutation, LoginFormMutation$data } from "./__generated__/LoginFormMutation.graphql";
import { useAppDispatch } from "../../store/hooks";
import { setIsLoggedIn, setToken, setUser } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [sendLogin, isLoginMutationInFlight] = useMutation<LoginFormMutation>(graphql`
    mutation LoginFormMutation($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        success
        error
        user {
          id
          name
          first_lastname
          second_lastname
          email
          cellphone
        }
      }
    }
  `);

  const login = (): void => {
    sendLogin({
      variables: {
        email: emailRef.current?.value ?? "",
        password: passwordRef.current?.value ?? "",
      },
      onCompleted: (response: LoginFormMutation$data) => {
        if (response.login === null) return;
        const { error, success, user } = response.login;
        if (error !== null && !success) {
          alert(error);
        } else {
          dispatch(setUser(user as any));
          dispatch(setIsLoggedIn(true));
          dispatch(setToken("TOKEN BITCH"));
          navigate("/app/");
        }
      },
      onError: (error: Error) => {
        console.error(error);
      },
    });
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
                  {isLoginMutationInFlight ? "Loading..." : "Iniciar sesión"}
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

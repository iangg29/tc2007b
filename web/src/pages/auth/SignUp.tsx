// (c) Tecnologico de Monterrey 2022, rights reserved.

import { useEffect, useId, useRef } from "react";
import logo from "../../assets/logos/logoColorSC.png";
import { APP_NAME } from "../../utils/ApplicationConstants";
import axios from "axios";
import Cookies from "js-cookie";
import { selectIsLoggedIn, setIsLoggedIn, setToken, setUser } from "../../store/slices/authSlice";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";

const SignUp = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const nameRef = useRef<HTMLInputElement>(null);
  const firstLastNameRef = useRef<HTMLInputElement>(null);
  const secondLastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const cellphoneRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const nameId = useId();
  const firstLastNameId = useId();
  const secondLastNameId = useId();
  const emailId = useId();
  const cellphoneId = useId();
  const genderId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();

  const navigate = useNavigate();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/app");
    }
  }, [isLoggedIn]);

  const getData = (): object => {
    return {
      name: nameRef.current?.value,
      first_lastname: firstLastNameRef.current?.value,
      second_lastname: secondLastNameRef.current?.value,
      email: emailRef.current?.value,
      cellphone: cellphoneRef.current?.value,
      gender: genderRef.current?.value,
      password: passwordRef.current?.value,
      confirm_password: confirmPasswordRef.current?.value,
    };
  };

  const isDataValid = (): boolean => {
    if (
      nameRef.current?.value !== undefined &&
      firstLastNameRef.current?.value !== undefined &&
      secondLastNameRef.current?.value !== undefined &&
      emailRef.current?.value !== undefined &&
      cellphoneRef.current?.value !== undefined &&
      genderRef.current?.value !== undefined &&
      passwordRef.current?.value !== undefined &&
      confirmPasswordRef.current?.value !== undefined
    ) {
      if (passwordRef.current?.value !== confirmPasswordRef.current.value) {
        return false;
      }
      if (passwordRef.current?.value.length < 8) {
        return false;
      }
      return true;
    }
    return false;
  };

  const submitForm = (): void => {
    if (isDataValid()) {
      (async () => {
        await axios.post("/auth/signup", getData()).then((res) => {
          const { status, token, user } = res.data;
          if (status === "success") {
            Cookies.set("token", `Bearer ${token as string}`);
            dispatch(setUser(user));
            dispatch(setToken(token));
            dispatch(setIsLoggedIn(true));
            navigate("/app/home");
          } else {
            void Swal.fire({
              title: "Error",
              icon: "error",
              text: "Algo salió mal.",
              customClass: {
                container: "swal2-container",
              },
            });
          }
        });
      })()
        .then()
        .catch((error) => {
          console.error(error);
          void Swal.fire({
            title: "Error",
            icon: "error",
            text: "Algo salió mal",
            customClass: {
              container: "swal2-container",
            },
          });
        });
    } else {
      void Swal.fire({
        title: "Error",
        icon: "error",
        text: "Verifica tus campos.",
        customClass: {
          container: "swal2-container",
        },
      });
    }
  };

  return (
    <div className="w-full h-full grid items-center justify-center bg-gradient-to-r from-sky-600">
      {/* <img src={back} className="w-full h-full object-cover object-center" alt="" /> */}
      <div className="text-center space-y-10">
        <div className="-my-20">
          <img src={logo} alt={APP_NAME} className="w-3/4 mx-auto" />
        </div>
        <h2 className="text-2xl font-semibold">Crear nuevo perfil</h2>
        <div className="space-y-5">
          <div className="text-left">
            <label htmlFor={nameId}>Ingresa tu nombre</label>
            <input type="text" ref={nameRef} id={nameId} className="inputLogin" placeholder="Nombre(s)" />
          </div>
          <div className="flex flex-row w-full justify-between space-x-10">
            <div className="text-left">
              <label htmlFor={firstLastNameId}>Primer apellido</label>
              <input
                type="text"
                ref={firstLastNameRef}
                id={firstLastNameId}
                className="inputLogin"
                placeholder="Primer apellido"
              />
            </div>
            <div className="text-left">
              <label htmlFor={secondLastNameId}>Segundo apellido</label>
              <input
                type="text"
                ref={secondLastNameRef}
                id={secondLastNameId}
                className="inputLogin"
                placeholder="Segundo apellido"
              />
            </div>
          </div>
          <div className="text-left">
            <label htmlFor={emailId}>Ingresa tu correo electrónico</label>
            <input type="email" ref={emailRef} id={emailId} className="inputLogin" placeholder="Email" />
          </div>
          <div className="text-left">
            <label htmlFor={cellphoneId}>Ingresa tu celular</label>
            <input type="tel" ref={cellphoneRef} id={cellphoneId} className="inputLogin" placeholder="Celular" />
          </div>
          <div className="text-left">
            <label htmlFor={genderId}>Selecciona tu género</label>
            <select id={genderId} className="inputLogin" ref={genderRef}>
              <option value="male">Hombre</option>
              <option value="female">Mujer</option>
              <option value="undefined">Otro</option>
            </select>
          </div>
          <div className="flex flex-row w-full justify-between space-x-10">
            <div className="text-left">
              <label htmlFor={passwordId}>Contraseña</label>
              <input
                type="password"
                ref={passwordRef}
                id={passwordId}
                className="inputLogin"
                placeholder="Contraseña"
              />
            </div>
            <div className="text-left">
              <label htmlFor={confirmPasswordId}>Confirma tu contraseña</label>
              <input
                type="password"
                ref={confirmPasswordRef}
                id={confirmPasswordId}
                className="inputLogin"
                placeholder="Confirmación de tu contraseña"
              />
            </div>
          </div>
        </div>
        <div className="pb-10">
          <button onClick={submitForm} className="bg-blue-900 text-indigo-50 px-10 py-2 rounded-lg font-semibold">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

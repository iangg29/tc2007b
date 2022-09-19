// (c) Tecnologico de Monterrey 2022, rights reserved.

import { useId, useRef } from "react";
import { useMutation } from "react-relay";
import logo from "../../assets/logos/logoColorSC.png";
import graphql from "babel-plugin-relay/macro";
import { APP_NAME } from "../../utils/ApplicationConstants";
import { useNavigate } from "react-router-dom";

const SignUp = (): JSX.Element => {
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

  const [triggerMutation, isMutationInFlight] = useMutation(graphql`
    mutation SignUpMutation(
      $name: String!
      $first_lastname: String!
      $second_lastname: String!
      $email: String!
      $cellphone: String!
      $gender: String!
      $password: String!
      $confirm_password: String!
    ) {
      signup(
        name: $name
        first_lastname: $first_lastname
        second_lastname: $second_lastname
        email: $email
        cellphone: $cellphone
        gender: $gender
        password: $password
        confirm_password: $confirm_password
      ) {
        success
        error
        user {
          id
          email
        }
      }
    }
  `);

  const submitForm = (): void => {
    triggerMutation({
      variables: {
        name: nameRef.current?.value,
        first_lastname: firstLastNameRef.current?.value,
        second_lastname: secondLastNameRef.current?.value,
        email: emailRef.current?.value,
        cellphone: cellphoneRef.current?.value,
        gender: genderRef.current?.value,
        password: passwordRef.current?.value,
        confirm_password: confirmPasswordRef.current?.value,
      },
      onCompleted: (response: any, errors) => {
        console.debug("[RESPONSE]", response);
        console.debug("[ERRORS]", errors);
        const { success, user, error } = response.signup;
        if (success as boolean) {
          navigate(`/login?email=${user.email as string}`);
        } else {
          // TODO: Launch error modal.
          console.debug("[RELAY] [ERRORS]", error);
        }
      },
      onError: (error) => {
        console.error("[ERROR]", error);
      },
    });
  };

  return (
    <div className="h-screen grid items-center justify-center">
      <div className="text-center space-y-10">
        <div className="-my-20">
          <img src={logo} alt={APP_NAME} className="w-3/4 mx-auto" />
        </div>
        <h2>Crear nuevo perfil</h2>
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
        <button onClick={submitForm} className="bg-indigo-900 text-indigo-50 px-10 py-1 rounded-lg font-semibold">
          {isMutationInFlight ? "Cargando..." : "Enviar"}
        </button>
      </div>
    </div>
  );
};

export default SignUp;

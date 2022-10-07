// (c) Tecnologico de Monterrey 2022, rights reserved.
import LoginForm from "../../components/login/LoginForm";
import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectIsLoggedIn } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = (): JSX.Element => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/app");
    }
  }, [isLoggedIn]);

  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;

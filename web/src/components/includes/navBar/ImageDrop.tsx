// (c) Tecnologico de Monterrey 2022, rights reserved.
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useAppDispatch } from "../../../store/hooks";
import { setIsLoggedIn, setToken } from "../../../store/slices/authSlice";

interface Props {
  image: string;
  userName: string;
  email: string;
}

const ImageDrop = ({ image, userName, email }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = (): void => {
    (async () => {
      return await axios.get((process.env.REACT_APP_API_URL as string) + "/auth/logout");
    })()
      .then((res: AxiosResponse<any>) => {
        const { success, message } = res.data;
        if (success as boolean) {
          alert(message);
          dispatch(setToken(""));
          dispatch(setIsLoggedIn(false));
          Cookies.remove("token");
          navigate("/login");
        }
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <div className="flex md:order-2 mr-32">
        <Dropdown arrowIcon={false} inline={true} label={<Avatar alt="User settings" img={image} rounded={true} />}>
          <Dropdown.Header>
            <span className="block text-sm">{userName}</span>
            <span className="block truncate text-sm font-medium">{email}</span>
          </Dropdown.Header>

          <Dropdown.Item>
            <Link to={"/app/profile"} className="navBarLink">
              Mi perfil
            </Link>
          </Dropdown.Item>
          <Dropdown.Divider />

          <Dropdown.Item>
            <div className="navBarLink" onClick={logout}>
              Cerrar Sesión
            </div>
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </>
  );
};

export default ImageDrop;

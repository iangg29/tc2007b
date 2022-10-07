// (c) Tecnologico de Monterrey 2022, rights reserved.
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

interface Props {
  image: string;
  userName: string;
  email: string;
}

const ImageDrop = ({ image, userName, email }: Props): JSX.Element => {
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
            <Link to={""} className="navBarLink">
              Cerrar Sesión
            </Link>
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </>
  );
};

export default ImageDrop;

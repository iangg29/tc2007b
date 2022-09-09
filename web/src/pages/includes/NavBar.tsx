// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import logoQRO from "../../assets/logos/logoColorSC.png";
import profileIcon from "../../assets/icons/profileIcon.png";

const NavBar = (): JSX.Element => {
  return (
    <>
      <Navbar
        fluid={true}
        rounded={true}
        style={{
          borderBottomWidth: 3,
          borderColor: "#6694c1",
        }}
      >
        <Navbar.Brand href="">
          <img src={logoQRO} className="mr-3 h-20 sm:h-28" alt="Foto perfil" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Tramita La Cultura Qro
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2 mr-32">
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={<Avatar alt="User settings" img={profileIcon} rounded={true} />}
          >
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">name@flowbite.com</span>
            </Dropdown.Header>
            <Dropdown.Item>Mi Perfil</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Cerrar Sesión</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/navbars" active={true}>
            Home
          </Navbar.Link>
          {/* Dropdown  */}
          <div className="flex md:order-2">
            <Dropdown arrowIcon={true} inline={true} label="Solicitudes">
              <Dropdown.Item>Pendientes sin documentos aprobados</Dropdown.Item>
              <Dropdown.Item>Pendientes a revisón de propuesta</Dropdown.Item>
              <Dropdown.Item>Aprobadas</Dropdown.Item>
              <Dropdown.Divider />
            </Dropdown>
            <Navbar.Toggle />
          </div>

          <Navbar.Link href="/analitica">Analíticas</Navbar.Link>
          <Navbar.Link href="/chat">Chat</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;

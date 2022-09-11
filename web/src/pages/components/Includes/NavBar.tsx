// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import logoQRO from "../../../assets/logos/logoColorSC.png";
import profileIcon from "../../../assets/icons/profileIcon.png";
import { Link } from "react-router-dom";

const NavBar = (): JSX.Element => {
  return (
    <>
      <div className="bg-main-50">
        <Navbar
          fluid={true}
          rounded={true}
          style={{
            borderBottomWidth: 3,
            borderColor: "#6694c1",
            // backgroundColor: "#C4D0DB"
          }}
        >
          <Navbar.Brand>
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
                <span className="block text-sm">User Name</span>
                <span className="block truncate text-sm font-medium">example@qro.gob.mx</span>
              </Dropdown.Header>
              <Dropdown.Item>Mi Perfil</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Cerrar Sesión</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link>
              <Link to={"Home"}>Home</Link>
            </Navbar.Link>
            {/* Dropdown  */}
            <Navbar.Link active={false}>
              <div className="flex md:order-2">
                <Dropdown arrowIcon={true} inline={true} label="Solicitudes">
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    <Navbar.Link>
                      <Link to={"Solicitudes/RevisarDocumentos"}>Pendientes sin documentos aprobados</Link>
                    </Navbar.Link>
                  </Dropdown.Item>
                  <Dropdown.Item>Pendientes a revisón de propuesta</Dropdown.Item>
                  <Dropdown.Item>Aprobadas</Dropdown.Item>
                  <Dropdown.Divider />
                </Dropdown>
              </div>
            </Navbar.Link>

            <Navbar.Link>
              <Link to={""}>Analíticas</Link>
            </Navbar.Link>

            <Navbar.Link>
              <Link to={""}>Chat</Link>
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default NavBar;

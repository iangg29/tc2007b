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
          }}
        >
          <Navbar.Brand>
            <img src={logoQRO} className="mr-3 h-20 sm:h-28" alt="Foto perfil" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Tramita La Cultura Qro
            </span>
          </Navbar.Brand>
          {/* Image Dropdown  */}
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

              <Dropdown.Item>
                <Link to={""} className="text-gray-700 hover:text-blue-600">
                  Mi perfil
                </Link>
              </Dropdown.Item>
              <Dropdown.Divider />

              <Dropdown.Item>
                <Link to={""} className="text-gray-700 hover:text-blue-600">
                  Cerrar Sesión
                </Link>
              </Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>

          {/* NavBar normal items */}
          <Navbar.Collapse>
            <Link to={"/app/Home"} className="text-gray-700 hover:text-blue-600">
              Home
            </Link>

            {/* Dropdown  */}
            <Navbar.Link active={false}>
              <div className="flex md:order-2">
                <Dropdown arrowIcon={true} inline={true} label="Solicitudes">
                  <Dropdown.Divider />

                  <Dropdown.Item>
                    <Link to={"Solicitudes/RevisarDocumentos"} className="text-gray-700 hover:text-blue-600">
                      Pendientes sin documentos aprobados
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link to={""} className="text-gray-700 hover:text-blue-600">
                      Pendientes a revisón de propuesta
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link to={""} className="text-gray-700 hover:text-blue-600">
                      Aprobadas
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Divider />
                </Dropdown>
              </div>
            </Navbar.Link>

            {/* NavBar normal items */}
            <Link to={""} className="text-gray-700 hover:text-blue-600">
              Analíticas
            </Link>

            <Link to={""} className="text-gray-700 hover:text-blue-600">
              Chat
            </Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default NavBar;

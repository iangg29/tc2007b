// (c) Tecnologico de Monterrey 2022, rights reserved.
import { Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

const ArrowDrop = (): JSX.Element => {
  return (
    <>
      <Navbar.Link>
        <div className="flex md:order-2">
          <Dropdown arrowIcon={true} inline={true} label="Solicitudes">
            <Dropdown.Divider />

            <Dropdown.Item>
              <Link to={"Solicitudes/RevisarDocumentos"} className="navBarLink">
                Pendientes sin documentos aprobados
              </Link>
            </Dropdown.Item>

            <Dropdown.Item>
              <Link to={"Solicitudes/RevisarPropuestas"} className="navBarLink">
                Pendientes a revisión de propuesta
              </Link>
            </Dropdown.Item>

            <Dropdown.Item>
              <Link to={"Solicitudes/RevisarAprobadas"} className="navBarLink">
                Aprobadas
              </Link>
            </Dropdown.Item>

            <Dropdown.Item>
              <Link to={"Solicitudes/RevisarFinalizadas"} className="navBarLink">
                Finalizadas
              </Link>
            </Dropdown.Item>

            <Dropdown.Divider />
          </Dropdown>
        </div>
      </Navbar.Link>
    </>
  );
};

export default ArrowDrop;

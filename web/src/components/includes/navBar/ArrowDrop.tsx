// (c) Tecnologico de Monterrey 2022, rights reserved.
import { Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

const ArrowDrop = (): JSX.Element => {
  return (
    <>
      <Navbar.Link>
        <div className="flex md:order-2 text-xl">
          <Dropdown arrowIcon={true} inline={true} label="Solicitudes">
            <Dropdown.Divider />

            <Dropdown.Item>
              <Link to={"applications/reviewdocuments/2"} className="navBarLink">
                Por revisar documentos
              </Link>
            </Dropdown.Item>

            <Dropdown.Item>
              <Link to={"applications/reviewproposals/3"} className="navBarLink">
                Por aprobar
              </Link>
            </Dropdown.Item>

            <Dropdown.Item>
              <Link to={"applications/reviewapproved/5"} className="navBarLink">
                Aprobadas
              </Link>
            </Dropdown.Item>

            <Dropdown.Item>
              <Link to={"applications/reviewfinished/6"} className="navBarLink">
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

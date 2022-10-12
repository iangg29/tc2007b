// (c) Tecnologico de Monterrey 2022, rights reserved.
import { Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

const ArrowDrop = (): JSX.Element => {
  return (
    <>
      <Navbar.Link>
        <div className="flex md:order-2 text-2xl">
          <Dropdown arrowIcon={true} inline={true} label="Solicitudes">
            <Dropdown.Divider />

            <Dropdown.Item>
              <Link to={"applications/reviewdocuments"} className="navBarLink">
                Por revisar documentos
              </Link>
            </Dropdown.Item>

            <Dropdown.Item>
              <Link to={"applications/reviewproposals"} className="navBarLink">
                Por aprobar
              </Link>
            </Dropdown.Item>

            <Dropdown.Item>
              <Link to={"applications/reviewapproved"} className="navBarLink">
                Aprobadas
              </Link>
            </Dropdown.Item>

            <Dropdown.Item>
              <Link to={"applications/reviewfinished"} className="navBarLink">
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

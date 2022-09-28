// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Navbar } from "flowbite-react";
import profileIcon from "../../../assets/icons/profileIcon.png";
import { Link } from "react-router-dom";
import ImageDrop from "./ImageDrop";
import NavBrand from "./NavBrand";
import ArrowDrop from "./ArrowDrop";

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
          {/* NavBrand refers to the principal logo */}
          <NavBrand />

          {/* Image Dropdown  */}
          <ImageDrop image={profileIcon} userName="User Name" email="example@qro.gob.mx" />

          {/* NavBar normal items */}
          <Navbar.Collapse>
            <Link to={"/app/Home"} className="navBarLink">
              Home
            </Link>

            {/* Arrow Dropdown  */}
            <ArrowDrop />

            {/* NavBar normal items */}
            <Link to={""} className="navBarLink">
              Analíticas
            </Link>

            <Link to={""} className="navBarLink">
              Chat
            </Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default NavBar;

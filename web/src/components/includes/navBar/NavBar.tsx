// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Navbar } from "flowbite-react";
import profileIcon from "../../../assets/icons/profileIcon.png";
import { NavLink } from "react-router-dom";
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
            <NavLink to={"/app/Home"} className={({ isActive }) => (isActive ? "navBarActive" : "navBarLink ")}>
              Home
            </NavLink>

            {/* Arrow Dropdown  */}
            <ArrowDrop />

            {/* NavBar normal items */}
            <NavLink to={"/app/Analiticas"} className={({ isActive }) => (isActive ? "navBarActive" : "navBarLink ")}>
              Analíticas
            </NavLink>

            <NavLink to={"/app/Chat"} className={({ isActive }) => (isActive ? "navBarActive" : "navBarLink ")}>
              Chat
            </NavLink>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default NavBar;

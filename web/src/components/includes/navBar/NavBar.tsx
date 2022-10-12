// (c) Tecnologico de Monterrey 2022, rights reserved.

import { Navbar } from "flowbite-react";
import profileIcon from "../../../assets/icons/profileIcon.png";
import { NavLink } from "react-router-dom";
import ImageDrop from "./ImageDrop";
import NavBrand from "./NavBrand";
import ArrowDrop from "./ArrowDrop";
import { useAppSelector } from "../../../store/hooks";
import { selectUser } from "../../../store/slices/authSlice";

const NavBar = (): JSX.Element => {
  const user: any = useAppSelector(selectUser);
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
          <ImageDrop
            image={profileIcon}
            userName={`${user.name as string} ${user.first_lastname as string}`}
            email={user.email}
          />

          {/* NavBar normal items */}
          <Navbar.Collapse>
            <NavLink to={"/app/home"} className={({ isActive }) => (isActive ? "navBarActive" : "navBarLink ")}>
              <p className="text-2xl">Home</p>
            </NavLink>

            {/* Arrow Dropdown  */}
            <ArrowDrop />

            {/* NavBar normal items */}
            {/* <NavLink to={"/app/analytics"} className={({ isActive }) => (isActive ? "navBarActive" : "navBarLink ")}>
              Analíticas
            </NavLink> */}
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default NavBar;

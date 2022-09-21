// (c) Tecnologico de Monterrey 2022, rights reserved.
import logoQRO from "../../../../assets/logos/logoColorSC.png";

import { Navbar } from "flowbite-react";

const NavBrand = (): JSX.Element => {
  return (
    <>
      <Navbar.Brand>
        <img src={logoQRO} className="mr-3 h-20 sm:h-28" alt="Foto perfil" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Tramita La Cultura Qro
        </span>
      </Navbar.Brand>
    </>
  );
};

export default NavBrand;

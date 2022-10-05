// (c) Tecnologico de Monterrey 2022, rights reserved.

import Foot from "../components/includes/Footer";
import NavBar from "../components/includes/navBar/NavBar";

const Wrapper = ({ children }: any): JSX.Element => {
  return (
    <main className="h-screen overflow-y-auto">
      <NavBar />
      <div className="container mx-auto grid">{children}</div>
      <Foot />
    </main>
  );
};

export default Wrapper;

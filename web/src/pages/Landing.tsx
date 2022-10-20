// (c) Tecnologico de Monterrey 2022, rights reserved.
import { Link } from "react-router-dom";
import blueLoop from "../assets/background/blueLoop.mp4";
import logo from "../assets/logos/logoColorSC.png";

const Landing = (): JSX.Element => {
  return (
    <div className="flex relative justify-center h-screen overflow-hidden">
      <div className="relative z-30 text-2xl text-blue-700">
        <div className="pl-96 pt-4 pb-0">
          <button className="bg-sky-900 text-white text-sm px-10 py-2 rounded-lg font-semibold">
            <Link to="/login">Iniciar sesión</Link>
          </button>
        </div>
        <div>
          <img src={logo} className="p-0" />
          <h1 className="rounded-xl text-center text-black text-4xl font-bold">Tramita La Cultura QRO</h1>
          <br></br>
        </div>
        <div className="bg-white bg-opacity-60 rounded-xl p-2 text-center">¡Descarga la aplicación móvil aquí!</div>
        <div className="text-center">
          <a
            href="https://culturaqueretaro.gob.mx/iqca/sitio/Servicioscontroller/lineamientosDescargas"
            target="noopener"
            className="text-sky-900 text-sm font-semibold text-center"
          >
            © Consulta términos y condiciones.
          </a>
        </div>
      </div>
      <video autoPlay loop muted className="absolute w-auto min-w-full min-h-full max-w-none">
        <source src={blueLoop} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Landing;

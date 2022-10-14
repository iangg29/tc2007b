// (c) Tecnologico de Monterrey 2022, rights reserved.
import blueLoop from "../assets/background/blueLoop.mp4";
import logo from "../assets/logos/logoColorSC.png";

const Landing = (): JSX.Element => {
  return (
    <div className="flex relative justify-center h-screen overflow-hidden">
      <div className="relative z-30 text-2xl text-blue-700">
        <div>
          <img src={logo} className="p-0" />
          <h1 className="rounded-xl text-center text-black text-4xl font-bold">Tramita La Cultura QRO</h1>
          <br></br>
        </div>
        <div className="bg-white bg-opacity-70 rounded-xl p-2 text-center">¡Descarga la aplicación móvil aquí!</div>
        <a
          href="https://culturaqueretaro.gob.mx/iqca/sitio/Servicioscontroller/lineamientosDescargas"
          className="text-sky-900 text-sm font-semibold"
        >
          © Consulta términos y condiciones
        </a>
      </div>
      <video autoPlay loop muted className="absolute w-auto min-w-full min-h-full max-w-none">
        <source src={blueLoop} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Landing;

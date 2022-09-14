// (c) Tecnologico de Monterrey 2022, rights reserved.
import Foot from "./includes/Footer";
import NavBar from "./includes/NavBar";
import Label from "../components/Label";
import Document from "../components/Doc_Review";

const Req_Documentation = (): JSX.Element => {
  // Request - Info
  const exampleRequest = {
    titulo: "Arte Típico",
    autor: "Susana Horia",
    img: "https://infolibros.org/wp-content/uploads/2021/06/Libros-de-Artes-Visuales.jpg?ezimgfmt=ng%3Awebp%2Fngcb33%2Frs%3Adevice%2Frscb33-1",
  };

  // Request - Labels
  const exampleLabels = [{ label: "Cine" }, { label: "Música" }, { label: "Literatura" }, { label: "Danza" }];

  // Request - Documents
  const exampleDocs = [
    { title: "INE.jpg", update_at: "14/09/2022", link: "https://www.protocolo.com.mx/wp-content/uploads/ine-01.jpg" },
    { title: "CURP.jpg", update_at: "01/02/2021", link: "https://sandiegoleisure.com/files/CURP_FOR_FOREIGNERS.jpg" },
    { title: "Domicilio.pdf", update_at: "21/05/2022", link: "https://es.scribd.com/document/360818376/Comprobante-Domicilio" },
    { title: "Pasaporte.pdf", update_at: "06/12/2020", link: "https://as1.ftcdn.net/v2/jpg/01/41/33/80/1000_F_141338053_EoksmBImK7aaJanhLPYYkI8AdWzNrX8v.jpg" },
  ];

  return (
    <div>
      <NavBar />
      <div className="w-full grid md:grid-cols-2 py-8 pl-8 pr-8 md:pl-24 md:pr-24">
        {/* REQUEST - BASIC INFO */}
        <div className="w-full pt-2">
          <h1 className="text-3xl md:text-2xl lg:text-3xl text-[#396FB1] font-bold">Proyecto: {exampleRequest.titulo}</h1>
          <img className="w-[500px] py-4 pr-8 lg:pr-16" src={exampleRequest.img} alt="art" />
          <p className="text-lg font-semibold tracking-tight text-gray-900">Realizado por: {exampleRequest.autor}</p>
          <div className="w-[450px] md:w-[280px] lg:w-[400px] flex flex-wrap content-start pt-4 gap-2">
            <p className="text-medium">Categorías:</p>
            {exampleLabels.map((elem) => {
              return <Label label={elem.label} />;
            })}
          </div>
        </div>
        {/* REQUEST - DOCUMENTATION */}
        <div className="w-full pt-8 md:pt-2 md:pl-12">
          <h2 className="text-xl text-[#396FB1] text-medium pb-2">Documentos</h2>
          {exampleDocs.map((elem) => {
              return <Document title={elem.title} update_at={elem.update_at} link={elem.link} />;
            })}
        </div>
      </div>
      <Foot />
    </div>
  );
};

export default Req_Documentation;

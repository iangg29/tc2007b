// (c) Tecnologico de Monterrey 2022, rights reserved.
import Label from "../components/Label/Label";
import Document from "../components/DocReview/Doc_Review";
import { IoIosArrowBack, IoMdArrowDropdownCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ReqEvidence = (): JSX.Element => {
  // Navigation - Go back to Req_Revision
  const navigate = useNavigate();

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
    {
      filename: "INE.jpg",
      updated: "14/09/2022",
      link: "https://www.protocolo.com.mx/wp-content/uploads/ine-01.jpg",
    },
    {
      filename: "CURP.jpg",
      updated: "01/02/2021",
      link: "https://sandiegoleisure.com/files/CURP_FOR_FOREIGNERS.jpg",
    },
    {
      filename: "Domicilio.pdf",
      updated: "21/05/2022",
      link: "https://es.scribd.com/document/360818376/Comprobante-Domicilio",
    },
    {
      filename: "Pasaporte.pdf",
      updated: "06/12/2020",
      link: "https://as1.ftcdn.net/v2/jpg/01/41/33/80/1000_F_141338053_EoksmBImK7aaJanhLPYYkI8AdWzNrX8v.jpg",
    },
  ];

  // Request - Evidence
  const exampleDetail = {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    impact:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    filename: "Evidencia.pdf",
    link: "https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf",
    updated: "06/09/2022",
  };

  return (
    <div>
      {/* RETURN - LAST PAGE */}
      <div className="w-fit pb-4 gap-2 pt-8 pl-8 pr-8 md:pl-24 md:pr-24">
        <button className="flex items-center content-center gap-x-1" onClick={() => navigate(-1)}>
          <IoIosArrowBack size={15} color="#252d53" />
          <span className="h-[27px] inline-block align-middle font-bold text-main-500">Regresar</span>
        </button>
      </div>
      <div className="w-full grid md:grid-cols-2 pb-8 pl-8 pr-8 md:pl-24 md:pr-24">
        {/* REQUEST - BASIC INFO */}
        <div className="w-full pt-2">
          <h1 className="text-3xl md:text-2xl lg:text-3xl text-[#396FB1] font-bold">
            Proyecto: {exampleRequest.titulo}
          </h1>
          <img className="w-[500px] py-4 pr-8 lg:pr-16" src={exampleRequest.img} alt="art" />
          <p className="text-lg font-semibold tracking-tight text-gray-900">Realizado por: {exampleRequest.autor}</p>
          <div className="w-[450px] md:w-[280px] lg:w-[400px] flex flex-wrap content-start pt-4 gap-2">
            <p className="text-medium">Categorías:</p>
            {exampleLabels.map((elem, index) => {
              return <Label key={index} label={elem.label} />;
            })}
          </div>
        </div>
        {/* REQUEST - EVIDENCE */}
        <div className="w-full pt-8 pr-8 md:pr-0 lg:pr-8 md:pt-2 md:pl-12">
          <div className="w-fit">
            <h2 className="text-xl text-[#396FB1] font-bold pb-2">Descripción</h2>
            <p className="text-justify">{exampleDetail.description}</p>

            <div className="w-fit flex gap-x-2 pb-2 pt-8">
              <h2 className="text-xl text-[#396FB1] font-bold">Documentación</h2>
              <button className="bottom-0 right-0">
                <IoMdArrowDropdownCircle size={15} color="#396FB1" />
              </button>
            </div>
            <div className="w-fit">
              {exampleDocs.map((elem, index) => {
                return <Document key={index} filename={elem.filename} updated={elem.updated} link={elem.link} />;
              })}
            </div>

            <h2 className="text-xl text-[#396FB1] font-bold pb-2 pt-8">Impacto</h2>
            <p className="text-justify">{exampleDetail.impact}</p>

            <h2 className="text-xl text-[#396FB1] font-bold pb-2 pt-8">Evidencia</h2>
            <Document filename={exampleDetail.filename} updated={exampleDetail.updated} link={exampleDetail.link} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReqEvidence;

// (c) Tecnologico de Monterrey 2022, rights reserved.
import Label from "../components/Label";
import Document from "../components/Doc_Review";
import Req_Button from "../components/Req_Button";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import { ReqDetailQuery, ReqDetailQuery$data } from "./__generated__/ReqDetailQuery.graphql";

const ReqDetail = (): JSX.Element => {
  // Navigation - Go back to Req_Revision
  const navigate = useNavigate();

  // Request - Info
  const data: ReqDetailQuery$data = useLazyLoadQuery<ReqDetailQuery>(
    graphql`
      query ReqDetailQuery {
        application(id: "6ddf3cbc-c2fc-4a66-a725-bee2e092bce8") {
          title
          user_id
          image
          description
          support
          user {
            name
          }
        }
      }
    `,
    {},
  );

  const { application } = data;
  const user = application?.user;

  console.debug(application);

  // Request - Labels
  const exampleLabels = [{ label: "Cine" }, { label: "Música" }, { label: "Literatura" }, { label: "Danza" }];

  // Request - Detail
  const exampleDetail = {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    filename: "Formato_Solicitud.pdf",
    link: "https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf",
    updated: "06/10/2022",
    requested_support:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
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
          <h1 className="text-3xl md:text-2xl lg:text-3xl text-[#396FB1] font-bold">Proyecto: {application?.title}</h1>
          <img className="w-[500px] py-4 pr-8 lg:pr-16" src={application?.image} alt="art" />
          <p className="text-lg font-semibold tracking-tight text-gray-900">Realizado por: {user?.name}</p>
          <div className="w-[450px] md:w-[280px] lg:w-[400px] flex flex-wrap content-start pt-4 gap-2">
            <p className="text-medium">Categorías:</p>
            {exampleLabels.map((elem, index) => {
              return <Label key={index} label={elem.label} />;
            })}
          </div>
        </div>
        {/* REQUEST - DETAIL */}
        <div className="w-full pt-8 pr-8 md:pr-0 lg:pr-8 md:pt-2 md:pl-12">
          <div className="w-fit">
            <h2 className="text-xl text-[#396FB1] font-bold pb-2">Descripción</h2>
            <p className="text-justify">{application?.description}</p>

            <h2 className="text-xl text-[#396FB1] font-bold pb-2 pt-8">Formato de solicitud</h2>
            <Document filename={exampleDetail.filename} updated={exampleDetail.updated} link={exampleDetail.link} />

            <h2 className="text-xl text-[#396FB1] font-bold pb-2 pt-8">Apoyo Solicitado</h2>
            <p className="text-justify">{application?.support}</p>

            <div className="w-full justify-center flex flex-wrap pt-8 gap-4 md:gap-2 lg:gap-4">
              <Req_Button text="Aprobar" navigate="/app/Solicitudes/RevisarDocumentos" />
              <Req_Button text="Rechazar" navigate="/app/Solicitudes/RevisarDocumentos" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReqDetail;

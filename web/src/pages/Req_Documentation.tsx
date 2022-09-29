// (c) Tecnologico de Monterrey 2022, rights reserved.
import Label from "../components/Label";
import Document from "../components/Doc_Review";
import Req_Button from "../components/Req_Button";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import { ReqDocumentationQuery, ReqDocumentationQuery$data } from "./__generated__/ReqDocumentationQuery.graphql";

const ReqDocumentation = (): JSX.Element => {
  // Navigation - Go back
  const navigate = useNavigate();

  // Request - Info / Documents
  const data: ReqDocumentationQuery$data = useLazyLoadQuery<ReqDocumentationQuery>(
    graphql`
      query ReqDocumentationQuery($application_id: ID!) {
        application(id: $application_id) {
          title
          user_id
          image
          user {
            name
          }
        }
        applicationdocuments(application_id: $application_id) {
          file_name
          url
          updated_at
        }
      }
    `,
    {application_id: "d558cace-8f9b-4794-a67c-8559542c1ca2"},
  );

  const { application, applicationdocuments } = data;
  const user = application?.user;

  console.debug(application);
  console.debug(applicationdocuments);

  // Request - Labels
  const exampleLabels = [{ label: "Cine" }, { label: "Música" }, { label: "Literatura" }, { label: "Danza" }];

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
        {/* REQUEST - DOCUMENTATION */}
        <div className="w-full pt-8 md:pt-2 md:pl-12">
          <h2 className="text-xl text-[#396FB1] font-bold pb-2">Documentos</h2>
          <div className="w-fit">
            {applicationdocuments?.map((elem: any, index) => {
              return (
                <Document
                  key={index}
                  filename={elem.file_name}
                  updated={elem.updated_at.substring(0, 10)}
                  link={elem.url}
                />
              );
            })}
            <div className="w-full justify-center flex flex-wrap pt-5 gap-4 md:gap-2 lg:gap-4">
              <Req_Button text="Aprobar documentos" navigate="../Solicitudes/RevisarDocumentos/Detalle" next={1} />
              <Req_Button text="Enviar a correción" navigate="../Solicitudes/RevisarDocumentos" next={-1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReqDocumentation;

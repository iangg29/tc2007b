// (c) Tecnologico de Monterrey 2022, rights reserved.
import Label from "../components/Label/Label";
import Document from "../components/DocReview/Doc_Review";
import Req_Button from "../components/Request/Button/Req_Button";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import { ReqDetailQuery, ReqDetailQuery$data } from "./__generated__/ReqDetailQuery.graphql";

// Page to review the proposal of an application
const ReqDetail = (): JSX.Element => {
  // Navigation - Go back to Req_Revision
  const navigate = useNavigate();

  // Params - ApplicationID
  const params = useParams();
  let applicationID = "";

  if (params.applicationId !== undefined) {
    applicationID = params.applicationId;
  }

  // Request - Info / Detail / Labels
  const data: ReqDetailQuery$data = useLazyLoadQuery<ReqDetailQuery>(
    graphql`
      query ReqDetailQuery($application_id: ID!) {
        applicationByID(id: $application_id) {
          title
          image
          description
          support
          user {
            name
            first_lastname
            second_lastname
          }
          applicationStatus {
            name
            order
          }
          applicationDocuments {
            file_name
            url
            updated_at
          }
          labels {
            id
            name
          }
        }
      }
    `,
    { application_id: applicationID },
    { fetchPolicy: "network-only" },
  );

  const { applicationByID } = data;
  const user = applicationByID?.user;
  const documents = applicationByID?.applicationDocuments;
  const labels = applicationByID?.labels;

  // As long as the request has not been accepted or rejected,
  // the user can change its status
  const status = applicationByID?.applicationStatus;
  const show = status?.order === 2 && status?.order < 3;

  return (
    <div>
      {/* RETURN - LAST PAGE */}
      <div className="w-fit pb-4 gap-2 pt-8 pl-8 pr-8 lg:pl-24 lg:pr-24">
        <button className="flex items-center content-center gap-x-1" onClick={() => navigate(-1)}>
          <IoIosArrowBack size={15} color="#252d53" />
          <span className="h-[27px] inline-block align-middle font-bold text-main-500">Regresar</span>
        </button>
      </div>
      <div className="w-full grid lg:grid-cols-2 pb-8 pl-8 pr-8 lg:pl-24 lg:pr-24">
        {/* REQUEST - BASIC INFO */}
        <div className="w-full pt-2">
          <h1 className="text-3xl md:text-2xl lg:text-3xl text-[#396FB1] font-bold">
            Proyecto: {applicationByID?.title}
          </h1>
          <img className="w-[800px] py-4 pr-8 lg:pr-16" src={applicationByID?.image} alt="art" />
          <p className="text-lg font-semibold tracking-tight text-gray-900">
            Realizado por: {user?.name} {user?.first_lastname} {user?.second_lastname}
          </p>
          <div className="w-[450px] md:w-[500px] lg:w-[400px] flex flex-wrap content-start pt-4 gap-2">
            <p className="text-medium">Categorías:</p>
            {labels?.map((elem: any) => {
              return <Label key={elem.id} label={elem.name} />;
            })}
          </div>
        </div>
        {/* REQUEST - DETAIL */}
        <div className="w-full pt-8 pr-8 md:pr-0 lg:pr-8 md:pt-2 lg:pl-12">
          <div className="w-fit">
            <h2 className="text-xl text-[#396FB1] font-bold pb-2">Descripción</h2>
            <p className="text-justify">{applicationByID?.description}</p>

            <div className="flex pb-2 pt-8">
              <h2 className="text-xl text-[#396FB1] font-bold">Documentos&nbsp;</h2>
              <h2 className="text-md text-[#396FB1] font-bold"> [REVISADOS]</h2>
            </div>
            {documents?.map((elem: any, index) => {
              return (
                <Document
                  key={index}
                  filename={elem.file_name}
                  updated={elem.updated_at.substring(0, 10)}
                  link={elem.url}
                />
              );
            })}

            <h2 className="text-xl text-[#396FB1] font-bold pb-2 pt-8">Apoyo Solicitado</h2>
            <p className="text-justify">{applicationByID?.support}</p>

            {show && (
              <div className="w-full justify-center flex flex-wrap pt-8 gap-4 md:gap-2 lg:gap-4">
                <Req_Button
                  key={1}
                  text="Aprobar"
                  navigate="/app/applications/reviewproposals"
                  next={4}
                  appID={params?.applicationId}
                />
                <Req_Button
                  key={2}
                  text="Rechazar"
                  navigate="/app/applications/reviewproposals"
                  next={3}
                  appID={params?.applicationId}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReqDetail;

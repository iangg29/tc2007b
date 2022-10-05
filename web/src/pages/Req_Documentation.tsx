// (c) Tecnologico de Monterrey 2022, rights reserved.
import Label from "../components/Label/Label";
import Document from "../components/DocReview/Doc_Review";
import Req_Button from "../components/Request/Button/Req_Button";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import { ReqDocumentationQuery, ReqDocumentationQuery$data } from "./__generated__/ReqDocumentationQuery.graphql";

// Page to review the documents of an application
const ReqDocumentation = (): JSX.Element => {
  // Navigation - Go back
  const navigate = useNavigate();

  // Params - ApplicationID
  const params = useParams();

  // Request - Info / Documents
  const data: ReqDocumentationQuery$data = useLazyLoadQuery<ReqDocumentationQuery>(
    graphql`
      query ReqDocumentationQuery($application_id: ID!) {
        applicationByID(id: $application_id) {
          id
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
        }
      }
    `,
    { application_id: params.applicationId! },
  );

  const { applicationByID } = data;
  const user = applicationByID?.user;
  const documents = applicationByID?.applicationDocuments;

  // As long as the documents have not been approved,
  // the user can change its status
  const status = applicationByID?.applicationStatus;
  const show = status!.order < 2;

  // Request - Labels
  const exampleLabels = [{ label: "Cine" }, { label: "Música" }, { label: "Literatura" }, { label: "Danza" }];

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
            {exampleLabels.map((elem, index) => {
              return <Label key={index} label={elem.label} />;
            })}
          </div>
        </div>
        {/* REQUEST - DOCUMENTATION */}
        <div className="w-full pt-8 lg:pt-2 lg:pl-12">
          <h2 className="text-xl text-[#396FB1] font-bold pb-2">Documentos</h2>
          <div className="w-fit">
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

            {show && (
              <div className="w-full justify-center flex flex-wrap pt-5 gap-4 md:gap-2 lg:gap-4">
                <Req_Button
                  text="Aprobar documentos"
                  navigate="../applications/reviewdocuments"
                  next={2}
                  appID={params.applicationId!}
                />
                <Req_Button
                  text="Enviar a correción"
                  navigate="../applications/reviewdocuments"
                  next={0}
                  appID={params.applicationId!}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReqDocumentation;

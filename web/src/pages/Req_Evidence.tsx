// (c) Tecnologico de Monterrey 2022, rights reserved.
import Label from "../components/Label";
import Document from "../components/Doc_Review";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import { ReqEvidenceQuery, ReqEvidenceQuery$data } from "./__generated__/ReqEvidenceQuery.graphql";

// Page to view evidence of an application
const ReqEvidence = (): JSX.Element => {
  // Navigation - Go back to Req_Revision
  const navigate = useNavigate();

  // Params - ApplicationID
  const params = useParams();

  // Request - Info / Documents / Evidence
  const data: ReqEvidenceQuery$data = useLazyLoadQuery<ReqEvidenceQuery>(
    graphql`
      query ReqEvidenceQuery($application_id: ID!) {
        evidenceByApplicationID(application_id: $application_id) {
          id
          impact
          document {
            file_name
            url
            updated_at
          }
          application {
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
      }
    `,
    { application_id: params.applicationId! },
  );

  const { evidenceByApplicationID } = data;
  const evidenceFile = evidenceByApplicationID?.document;
  const application = evidenceByApplicationID?.application;
  const user = application?.user;
  const documents = application?.applicationDocuments;

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
          <h1 className="text-3xl md:text-2xl lg:text-3xl text-[#396FB1] font-bold">Proyecto: {application?.title}</h1>
          <img className="w-[800px] py-4 pr-8 lg:pr-16" src={application?.image} alt="art" />
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
        {/* REQUEST - EVIDENCE */}
        <div className="w-full pt-8 pr-8 md:pr-0 lg:pr-8 lg:pt-2 lg:pl-12">
          <div className="w-fit">
            <h2 className="text-xl text-[#396FB1] font-bold pb-2">Descripción</h2>
            <p className="text-justify">{application?.description}</p>

            <div className="w-fit flex gap-x-2 pb-2 pt-8">
              <h2 className="text-xl text-[#396FB1] font-bold">Documentación</h2>
            </div>
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
            </div>

            <h2 className="text-xl text-[#396FB1] font-bold pb-2 pt-8">Impacto</h2>
            <p className="text-justify">{evidenceByApplicationID?.impact}</p>

            <h2 className="text-xl text-[#396FB1] font-bold pb-2 pt-8">Evidencia</h2>
            <Document
              filename={evidenceFile?.file_name!}
              updated={evidenceFile?.updated_at.substring(0, 10)!}
              link={evidenceFile?.url!}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReqEvidence;

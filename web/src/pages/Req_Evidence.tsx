// (c) Tecnologico de Monterrey 2022, rights reserved.
import Label from "../components/Label/Label";
import Document from "../components/DocReview/Doc_Review";
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
  let applicationID = "";

  if (params.applicationId !== undefined) {
    applicationID = params.applicationId;
  }

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
            application_title
            image
            application_description
            support
            user {
              name
              first_lastname
              second_lastname
            }
            applicationStatus {
              status_name
              order
            }
            applicationDocuments {
              file_name
              url
              updated_at
            }
            labels {
              id
              label_name
            }
          }
        }
      }
    `,
    { application_id: applicationID },
  );

  const { evidenceByApplicationID } = data;
  const evidenceFile = evidenceByApplicationID?.document;
  const application = evidenceByApplicationID?.application;
  const user = application?.user;
  const documents = application?.applicationDocuments;
  const labels = application?.labels;

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
            Proyecto: {application?.application_title}
          </h1>
          <img className="w-[800px] py-4 pr-8 lg:pr-16" src={application?.image} alt="art" />
          <p className="text-lg font-semibold tracking-tight text-gray-900">
            Realizado por: {user?.name} {user?.first_lastname} {user?.second_lastname}
          </p>
          <div className="w-[450px] md:w-[500px] lg:w-[400px] flex flex-wrap content-start pt-4 gap-2">
            <p className="text-medium">Categor??as:</p>
            {labels?.map((elem: any) => {
              return <Label key={elem.id} label={elem.label_name} />;
            })}
          </div>
        </div>
        {/* REQUEST - EVIDENCE */}
        <div className="w-full pt-8 pr-8 md:pr-0 lg:pr-8 lg:pt-2 lg:pl-12">
          <div className="w-fit">
            <h2 className="text-xl text-[#396FB1] font-bold pb-2">Descripci??n</h2>
            <p className="text-justify">{application?.application_description}</p>

            <div className="w-fit flex gap-x-2 pb-2 pt-8">
              <h2 className="text-xl text-[#396FB1] font-bold">Documentaci??n</h2>
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
              filename={evidenceFile?.file_name}
              updated={evidenceFile?.updated_at.substring(0, 10)}
              link={evidenceFile?.url}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReqEvidence;

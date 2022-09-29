// (c) Tecnologico de Monterrey 2022, rights reserved.
import { useNavigate } from "react-router-dom";
// import { useLazyLoadQuery } from "react-relay";
// import graphql from "babel-plugin-relay/macro";

// import { ReqDetailQuery, ReqDetailQuery$data } from "./__generated__/ReqButtonReqButtonQuery.graphql";

interface Props {
  text: string;
  navigate: string;
  next: number;
}

const ReqButton = ({ text, navigate, next }: Props): JSX.Element => {
  const nav = useNavigate();

  // Request - Status Update
  // const data: ReqButtonQuery$data = useLazyLoadQuery<ReqButtonQuery>(
  //   graphql`
  //     mutation ReqButtonQuery() {
  //       updateStatus(id: $application_id, next ) {
  //         title
  //         user_id
  //         image
  //         description
  //         support
  //         user {
  //           name
  //         }
  //       }
  //     }
  //   `,
  //   { },
  // );

  // const { application, applicationdocuments } = data;
  // console.debug(application);

  const handleClick = (e: any) => {
    e.preventDefault();
    // Cambiar status
    // 
    nav(navigate);
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="px-4 py-2 drop-shadow-md rounded-full bg-main-500 text-sm md:text-xs lg:text-sm text-white"
      >
        {text}
      </button>
    </>
  );
};

export default ReqButton;

// (c) Tecnologico de Monterrey 2022, rights reserved.
import { useNavigate } from "react-router-dom";
// import { graphql, useMutation } from "react-relay";

// import type {ReqButtonMutation, ReqButtonMutation$data } from './__generated__/ReqButtonMutation.graphql';

interface Props {
  text: string;
  navigate: string;
  appID: string;
  next: number;
}

const ReqButton = ({ text, navigate, appID, next }: Props): JSX.Element => {
  const nav = useNavigate();

  const handleClick = (e: any) => {
    e.preventDefault();
    // const data: ReqButtonMutation$data = useMutation<ReqButtonMutation>(
    //   graphql`
    //     mutation ReqButtonMutation($application_id: ID!, $next_status:Int!) {
    //       updateApplicationStatus(
    //         application_id: $application_id
    //         next_status: $next_status
    //       )
    //     }
    //   `,
    //   {application_id: appID, next_status: next},
    // );

    // const { updateApplicationStatus } = data;
    // console.debug(updateApplicationStatus);

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

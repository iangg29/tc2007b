// (c) Tecnologico de Monterrey 2022, rights reserved.
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import { ReqButtonMutation } from "./__generated__/ReqButtonMutation.graphql";

interface Props {
  text: string;
  navigate: string;
  appID: string;
  next: number;
}

const ReqButton = ({ text, navigate, appID, next }: Props): JSX.Element => {
  const nav = useNavigate();

  const [commitMutation, isMutationInFlight] = useMutation<ReqButtonMutation>(
    graphql`
      mutation ReqButtonMutation($application_id: ID!, $next_status: Int!) {
        updateApplicationStatus(application_id: $application_id, next_status: $next_status)
      }
    `,
  );

  const handleClick = (e: any): void => {
    e.preventDefault();

    commitMutation({
      variables: {
        application_id: appID as unknown as string,
        next_status: next as unknown as number,
      },
      onCompleted: (data) => {
        nav(navigate);
      },
    });
  };

  return (
    <>
      <button
        className="px-4 py-2 drop-shadow-md rounded-full bg-main-500 text-sm md:text-xs lg:text-sm text-white"
        onClick={handleClick}
        disabled={isMutationInFlight}
      >
        {text}
      </button>
    </>
  );
};

export default ReqButton;

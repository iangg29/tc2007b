// (c) Tecnologico de Monterrey 2022, rights reserved.

import RequestCard from "../../components/RequestCard/RequestCard";
import back from "../../assets/background/login.png";

interface citation {
  id: string;
  title: string;
}

interface user {
  id: string;
  name: string;
  first_lastname: string;
  second_lastname: string;
}

interface Props {
  text: string;
  color: string;
  element: {
    title: string;
    citation: citation;
    user: user;
  };
}

const RequestMap = ({ element, text, color }: Props): JSX.Element => {
  const exampleLabels = [{ label: "Cultura" }, { label: "Baile" }];

  return (
    <>
      <RequestCard
        image={back}
        proyectTile={element.title}
        announcement={element.citation.title}
        userName={element.user.name}
        userFirstName={element.user.first_lastname}
        userLastName={element.user.second_lastname}
        label={exampleLabels}
        buttonText={text}
        color={color}
      />
    </>
  );
};

export default RequestMap;

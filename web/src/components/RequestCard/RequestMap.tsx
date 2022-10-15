// (c) Tecnologico de Monterrey 2022, rights reserved.

import RequestCard from "../../components/RequestCard/RequestCard";
import back from "../../assets/background/login.png";

interface citation {
  id: string;
  citation_title: string;
}

interface user {
  id: string;
  name: string;
  first_lastname: string;
  second_lastname: string;
}

interface label {
  id: string;
  label_name: string;
}

interface Props {
  text: string;
  color: string;
  link: string;
  element: {
    application_title: string;
    image: string;
    citation: citation;
    user: user;
    labels: [label];
  };
}

const RequestMap = ({ element, text, color, link }: Props): JSX.Element => {
  return (
    <>
      <RequestCard
        image={element.image === null ? back : element.image}
        proyectTile={element.application_title}
        announcement={element.citation.citation_title}
        userName={element.user.name}
        userFirstName={element.user.first_lastname}
        userLastName={element.user.second_lastname}
        label={element.labels}
        buttonText={text}
        color={color}
        btnLink={link}
      />
    </>
  );
};

export default RequestMap;

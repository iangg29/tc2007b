// (c) Tecnologico de Monterrey 2022, rights reserved.

import RequestCard from "../components/RequestCard/RequestCard";
import back from "../../assets/background/login.png";

const ApproveDoc = (): JSX.Element => {
  const exampleLabels = [{ label: "Cultura" }, { label: "Baile" }];

  return (
    <>
      <h5 className=" py-5 text-2xl text-main-100">Solicitudes para revisión de documentos</h5>
      <div className="grid grid-cols-3">
        <RequestCard
          image={back}
          proyectTile="Proyecto 1"
          announcement="Convocatoria noche mexicana"
          user="Susana Horia"
          label={exampleLabels}
          buttonText="Revisar nuevamente"
        />
        <RequestCard
          image={back}
          proyectTile="Proyecto 2"
          announcement="Convocatoria Querétaro Mágico"
          user="Susana Horia"
          label={exampleLabels}
          buttonText="Dar seguimiento"
        />
        <RequestCard
          image={back}
          proyectTile="Proyecto 3"
          announcement="Convocatoria dulce o truco"
          user="Susana Horia"
          label={exampleLabels}
          buttonText="Revisar"
        />
      </div>
    </>
  );
};

export default ApproveDoc;

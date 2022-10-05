// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render } from "@testing-library/react";
import RequestCard  from "./RequestCard";

describe("Test RequestCard component", () => {
  it("render component", () => {
    render(<RequestCard
      image="https://revoluciontrespuntocero.mx/wp-content/uploads/2020/12/21-feb-cultura-LK.jpg"
      proyectTile = "Muñecas Querétanas para todos"
      announcement = "Culturizate QRO"
      userName = "Juan Pablo"
      userFirstName = "Mendoza"
      userLastName = "Reyes"
      label = {[{ label: "Cultura" }, { label: "Baile" }]}
      buttonText = "Revisar"
      color = "#D04D2A"
      btnLink = "/app/home"

    />)
  });
});

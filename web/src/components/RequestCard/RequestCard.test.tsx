// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render, screen } from "@testing-library/react";
import RequestCard from "./RequestCard";
import { BrowserRouter as Router } from "react-router-dom";

beforeEach(() =>
  render(
    <Router>
      <RequestCard
        image="https://revoluciontrespuntocero.mx/wp-content/uploads/2020/12/21-feb-cultura-LK.jpg"
        proyectTile="Muñecas Querétanas para todos"
        announcement="Culturizate QRO"
        userName="Juan Pablo"
        userFirstName="Mendoza"
        userLastName="Reyes"
        label={[{ label: "Cultura" }, { label: "Baile" }]}
        buttonText="Revisar"
        color="#D04D2A"
        btnLink="/app/home"
      />
    </Router>,
  ),
);

test("Test RequestCard button param", () => {
  const btnEl = screen.getByText(/revisar/i);
  expect(btnEl).toBeInTheDocument();
});

test("Test RequestCard name param", () => {
  const userNameEl = screen.getByText(/Juan Pablo Mendoza Reyes/i);
  expect(userNameEl).toBeInTheDocument();
});

// (c) Tecnologico de Monterrey 2022, rights reserved.
import { render,screen } from "@testing-library/react";
import ReqModal from "./Req_Modal";

beforeEach(() =>
  render(
    <ReqModal show={true} onClose={false} props="" header="Muestra modal" />
  ),
);

test("ReqButton text param validation", () => {
  const btnEl = screen.getByRole("button",{ name: /Aceptar/i});
  expect(btnEl).toBeInTheDocument();
});

test("ReqButton text param validation", () => {
  const btnEl = screen.getByRole("button",{ name: /Cancelar/i});
  expect(btnEl).toBeInTheDocument();
});

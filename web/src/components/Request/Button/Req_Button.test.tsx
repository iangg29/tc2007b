// (c) Tecnologico de Monterrey 2022, rights reserved.
import { render,screen } from "@testing-library/react";
import ReqButton from "./Req_Button";

beforeEach(() =>
  render(
    <ReqButton text="Botón prueba" navigate="/app/home" appID="1" next={2} />
  ),
);

test("ReqButton text param validation", () => {
  const btnEl = screen.getByRole("button",{ name: /Botón prueba/i});
  expect(btnEl).toBeInTheDocument();
});
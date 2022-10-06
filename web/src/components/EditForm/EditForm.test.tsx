// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render,screen } from "@testing-library/react";
import EditForm from "./EditForm";


beforeEach(() =>
  render(
    <EditForm name = "Prueba 1" date = "06/10/2022"
    image = "https://sf.gov/sites/default/files/styles/default/public/2020-06/get-tested-icon.png?itok=16MzwFw3"
    />,
  ),
);

test("Document Review input validation", () => {
  const inputEl = screen.getByLabelText(/titulo/i);
  expect(inputEl).toBeInTheDocument();
});

test("Document Review img label", () => {
  const imgEl = screen.getByRole("img",{ name : /image description/i});
  expect(imgEl).toBeInTheDocument();
});




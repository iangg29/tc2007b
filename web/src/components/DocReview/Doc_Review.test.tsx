// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render, screen } from "@testing-library/react";
import DocumentReview from "./Doc_Review";

beforeEach(() =>
  render(
    <DocumentReview
      filename="Prueba.pdf"
      updated="05/10/2022"
      link="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
    />,
  ),
);

test("Document Review filename param", () => {
  const fileEl = screen.getByText(/prueba.pdf/i);
  expect(fileEl).toBeInTheDocument();
});

test("Document Review updated param", () => {
  const updatedEl = screen.getByText("05/10/2022");
  expect(updatedEl).toBeInTheDocument();
});

// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render } from "@testing-library/react";
import DocumentReview from "./Doc_Review";

describe("Test Doc_Review component", () => {
  it("render component", () => {
    render(<DocumentReview filename = "Prueba.pdf" updated = "05/10/2022" 
    link = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"/>)
  });
});

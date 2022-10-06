// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render } from "@testing-library/react";
import EditModal from "./EditModal";

describe("EditModal tests", () => {
  it("renders EditModal", () => {
    render(<EditModal show={true} onClose={false} props={""} header="Modal edición de convocatoria" />);
  });
});

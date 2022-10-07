// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render } from "@testing-library/react";
import CheckboxDocument from "./CheckboxDocument";

// setChecked incompleted (requires a Hook)
describe("Test CheckboxDocument", () => {
  it("render component", () => {
    render(<CheckboxDocument name="Prueba.pdf" isChecked={true} id="1" setChecked={} />);
  });
});

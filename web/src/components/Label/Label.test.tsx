// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render } from "@testing-library/react";
import Label from "./Label";

describe("Test Doc_Review component", () => {
  it("render component", () => {
    render(<Label label="Cultura"/>)
  });
});

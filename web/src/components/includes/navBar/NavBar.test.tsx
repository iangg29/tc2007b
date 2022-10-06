// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render } from "@testing-library/react";
import NavBar from "./NavBar";

describe("Test RequestCard component", () => {
  it("Should render component", () => {
    render(<NavBar />);
  });
});

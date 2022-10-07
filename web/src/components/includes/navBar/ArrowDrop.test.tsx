// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ArrowDrop from "./ArrowDrop";

describe("Test Arrow Drop component", () => {
  it("render component", () => {
    render(
      <Router>
        <ArrowDrop />
      </Router>,
    );
  });
});

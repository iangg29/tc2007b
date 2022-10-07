// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render } from "@testing-library/react";
import RequestMap from "./RequestMap";
import { BrowserRouter as Router } from "react-router-dom";

// This is a map for RequestCard components
describe("Test Request component", () => {
  it("render component", () => {
    render(
      <Router>
        <RequestMap
          text="Revisar"
          color="#606E30"
          link="/app/home"
          element={{
            title: "México Mágico",
            citation: { id: "2", title: "Nuevo México" },
            user: { id: "1", name: "Paola", first_lastname: "Torres", second_lastname: "López" },
          }}
        />
      </Router>,
    );
  });
});

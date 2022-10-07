// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";
import { BrowserRouter as Router } from "react-router-dom";

describe("Test Arrow Drop component", () => {
  it("render component", () => {
    render(
      <Router>
        <NavBar />
      </Router>,
    );
  });
});

// beforeEach(() => render(<NavBar />));

// test("NavBar home validation", () => {
//   const homeEl = screen.getByText(/home/i);
//   expect(homeEl).toBeInTheDocument();
// });

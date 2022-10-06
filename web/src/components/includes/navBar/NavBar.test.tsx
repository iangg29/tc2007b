// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render,screen } from "@testing-library/react";
import NavBar from "./NavBar";

beforeEach(() => render(<NavBar />));

test("NavBar home validation", () => {
  const homeEl = screen.getByText(/home/i);
  expect(homeEl).toBeInTheDocument();
});


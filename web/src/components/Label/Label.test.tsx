// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render, screen } from "@testing-library/react";
import Label from "./Label";

beforeEach(() => render(<Label label="Cultura" />));

test("Label prop validation", () => {
  const labelEl = screen.getByText(/cultura/i);
  expect(labelEl).toBeInTheDocument();
});

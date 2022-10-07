// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render, screen } from "@testing-library/react";
import SingleTag from "./SingleTag";

beforeEach(() => render(<SingleTag key={1} element="Cultura" />));

describe("Test RequestCard button param", () => {
  it("should render a review button", () => {
    const btnEl = screen.getByText(/cultura/i);
    expect(btnEl).toBeInTheDocument();
  });
});

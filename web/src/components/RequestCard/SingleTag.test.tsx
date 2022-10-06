// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render,screen } from "@testing-library/react";
import SingleTag from "./SingleTag";


beforeEach(() =>
  render(<SingleTag key={1} element={{ label: "Cultura" }} />)
);

describe("Test RequestCard button param", () => {
  it("It should render a review button", () => {
    const btnEl = screen.getByText(/cultura/i );
    expect(btnEl).toBeInTheDocument();
  });
});


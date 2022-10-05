// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render } from "@testing-library/react";
import SingleTag  from "./SingleTag";

describe("Test SingleTag component", () => {
  it("render component", () => {
    render(<SingleTag  key={1} element= {{label: "Cultura"}} />)
  });
});

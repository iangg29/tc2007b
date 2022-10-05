// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render } from "@testing-library/react";
import LoginForm from "./LoginForm";

describe("Test LoginForm", () => {
  it("render component", () => {
    render(<LoginForm/>)
  });
});

// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";

// could not find react-redux context value; please ensure the component is wrapped in a <Provider>
describe("Test login form component", () => {
  it("render component", () => {
    //  render(<LoginForm />);
  });
});

// beforeEach(() => render(<LoginForm />));

// test("Document Review email input validation", () => {
//   const inputEl = screen.getByLabelText(/Correo Electronico/i);
//   expect(inputEl).toBeInTheDocument();
// });

// test("Document Review password input validation", () => {
//   const inputEl = screen.getByLabelText(/Contraseña/i);
//   expect(inputEl).toBeInTheDocument();
// });

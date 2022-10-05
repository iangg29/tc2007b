// (c) Tecnologico de Monterrey 2022, rights reserved.
import { render } from "@testing-library/react";
import ReqModal  from "./Req_Modal";

describe("Test Doc_Review component", () => {
  it("render component", () => {
    render(<ReqModal show = {true}  onClose = {false} props = "" header = "Muestra modal"/>)
  });
});
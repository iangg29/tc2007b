// (c) Tecnologico de Monterrey 2022, rights reserved.
import { render } from "@testing-library/react";
import ReqButton from "./Req_Button";

describe("Test Doc_Review component", () => {
  it("render component", () => {
    render(<ReqButton text="Botón prueba" navigate="/app/home" appID="1" next={2} />);
  });
});

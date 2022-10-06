// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render } from "@testing-library/react";
import DeleteModal from "./DeleteModal";

// onClose incomplete function
describe("DeleteModal tests", () => {
  it("Should render", () => {
    render(<DeleteModal show={true} onClose={false} name="PruebaDelete" />);
  });
});

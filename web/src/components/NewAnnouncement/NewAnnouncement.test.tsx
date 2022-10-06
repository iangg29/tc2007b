// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render } from "@testing-library/react";
import NewAnnouncementForm from "./NewAnnouncementForm";

describe("Test NewAnnouncementForm", () => {
  it("render component", () => {
    render(<NewAnnouncementForm />);
  });
});

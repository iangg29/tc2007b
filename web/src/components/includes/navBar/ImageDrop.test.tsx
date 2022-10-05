// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render } from "@testing-library/react";
import ImageDrop from "./ImageDrop";
import profileICON from "../../../assets/icons/profileIcon.png"

describe("Test Image Drop component", () => {
  it("render component", () => {
    render(<ImageDrop image = {profileICON} userName="User 1" email="mail@example.com"/>)
  });
});

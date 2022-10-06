// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render,screen } from "@testing-library/react";
import ImageDrop from "./ImageDrop";
import profileICON from "../../../assets/icons/profileIcon.png";

beforeEach(() =>
  render(
    <ImageDrop image={profileICON} userName="User 1" email="mail@example.com" />
  ),
);

test("Image drop param user validation", () => {
  const userEl = screen.getByText(/User 1/i);
  expect(userEl).toBeInTheDocument();
});

test("Image drop param email validation", () => {
  const emailEl = screen.getByText(/mail@example.com/i);
  expect(emailEl).toBeInTheDocument();
});

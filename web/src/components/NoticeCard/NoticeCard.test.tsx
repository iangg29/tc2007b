// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render, screen } from "@testing-library/react";
import NoticeCard from "./NoticeCard";

beforeEach(() =>
  render(
    <NoticeCard
      img="https://culturabcs.gob.mx/storage/announcements/ezRBx2nKR2s7xgZL80ll8MopoyHg4SYVfqtY0oPY.jpeg"
      name="Arte y Cultura ante el Covid"
      date="05/10/2020"
    />,
  ),
);

test("Notice card name param validation", () => {
  const citationNameEl = screen.getByText(/Arte y Cultura ante el Covid/i);
  expect(citationNameEl).toBeInTheDocument();
});

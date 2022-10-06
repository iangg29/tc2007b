// (c) Tecnologico de Monterrey 2022, rights reserved.

import { render } from "@testing-library/react";
import NoticeCard from "./NoticeCard";

describe("Notice card tests", () => {
  it("renders the Notice Card", () => {
    render(
      <NoticeCard
        img="https://culturabcs.gob.mx/storage/announcements/ezRBx2nKR2s7xgZL80ll8MopoyHg4SYVfqtY0oPY.jpeg"
        name="Arte y Cultura ante el Covid"
        date="05/10/2020"
      />,
    );
  });
});

// (c) Tecnologico de Monterrey 2022, rights reserved.

const serverAxios = require("../utils/serverRequest");

describe("Initial tests", () => {
  it("Is alive", async () => {
    const result = await serverAxios.get("/health");
    expect(result).toBeDefined();
    const { success, message } = result.data;
    expect(success).toBe(true);
    expect(message).toBe("Alive");
  });
});

import { Configuration } from "hyperone";

describe("library", () => {
  it("allows to create new configuration object", async () => {
    expect(() => new Configuration()).not.toThrow();
  });
});

import { Configuration } from "hyperone";

describe("test test", () => {
  it("runs test suite", async () => {
    const c = new Configuration();
    expect(c).toBe(c);
  });
});

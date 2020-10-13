import { Configuration } from "hyperone";
import { getPassportCredentialsHelper } from "@hyperone/credentials"

describe("library", () => {
  it("allows to create new configuration object", async () => {
    expect(() => new Configuration()).not.toThrow();
  });

  it("allows to perform request using credentials helper", async () => {
    const helper = getPassportCredentialsHelper()
    const config = new Configuration(
      {accessToken: helper.getToken("https://api.hyperone.com/v2")}
    )
  })
});

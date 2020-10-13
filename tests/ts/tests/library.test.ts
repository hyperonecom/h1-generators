import { Configuration } from "hyperone";
import { getPassportCredentialsHelper } from "@hyperone/credentials"
import { IamProjectApi } from 'hyperone'

describe("library", () => {
  it("allows to create new configuration object", async () => {
    expect(() => new Configuration()).not.toThrow();
  });

  it("allows to perform request using credentials helper", async () => {
    const helper = getPassportCredentialsHelper()
    const config = new Configuration(
      {accessToken: helper.getToken("https://api.hyperone.com/v2")}
    )
    const projectApiClient = new IamProjectApi(config)

    const response = await projectApiClient.projectList()
    expect(response.status).toBe(200)
  })
});

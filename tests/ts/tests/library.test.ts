import { Configuration, IamProjectApi } from "hyperone";
import { getPassportCredentialsHelper } from "@hyperone/credentials";

describe("library", () => {
  it("allows to create new configuration object", async () => {
    expect(() => new Configuration()).not.toThrow();
  });

  it("allows to perform request using credentials helper", async () => {
    const helper = getPassportCredentialsHelper();
    const config = new Configuration({
      accessToken: helper.getToken("https://api.hyperone.com/v2"),
    });
    const projectApiClient = new IamProjectApi(config);

    const response = await projectApiClient.iamProjectList();
    expect(response.status).toBe(200);
  });

  it("throws error when request is not signed", async () => {
    const projectApiClient = new IamProjectApi();

    await expect(projectApiClient.iamProjectList()).rejects.toThrow(
      "Request failed with status code 401"
    );
  });
});

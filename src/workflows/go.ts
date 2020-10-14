import { join } from "path";
import { generateTSClient } from "../generators/ts";
import { GeneratorFunctionInput } from "../types";
import { execute } from "../utils/shellUtils";

export const runGoWorkflow = async ({
  clientsLocation,
  openapiLocation,
  testsLocation,
}: GeneratorFunctionInput): Promise<void> => {
  const goClientLocation = join(clientsLocation, "go");
  const goTestsLocation = join(testsLocation, "go");
  await generateTSClient(openapiLocation, goClientLocation);
  await execute("/bin/bash ./execute.sh", goTestsLocation);
};

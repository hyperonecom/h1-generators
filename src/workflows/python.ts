import { join } from "path";
import { generatePythonClient } from "../generators/python";
import { GeneratorFunctionInput } from "../types";
import { execute } from "../utils/shellUtils";

export const runPythonWorkflow = async ({
  clientsLocation,
  openapiLocation,
  testsLocation,
}: GeneratorFunctionInput): Promise<void> => {
  const pythonClientLocation = join(clientsLocation, "python");
  const pythonTestsLocation = join(testsLocation, "python");
  await generatePythonClient(openapiLocation, pythonClientLocation);
  await execute("/bin/bash ./execute.sh", pythonTestsLocation);
};

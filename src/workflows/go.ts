import { join } from "path";
import { generateGoClient } from "../generators/go";
import { GeneratorFunctionInput } from "../types";
import { execute } from "../utils/shellUtils";

export const runGoWorkflow = async ({
  clientsLocation,
  openapiLocation,
  testsLocation,
}: GeneratorFunctionInput): Promise<void> => {
  const goClientLocation = join(clientsLocation, "go");
  const goTestsLocation = join(testsLocation, "go");
  await generateGoClient(openapiLocation, goClientLocation);

  const testFile = join(goTestsLocation, "_api_test.go");
  await execute(`cp ${testFile} api_test.go`, goClientLocation);

  await execute("go test ./...", goClientLocation);
  await execute("rm api_test.go", goClientLocation);
};

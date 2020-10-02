import { join } from "path";
import { generateTSClient } from "../generators/ts";
import { execute } from "../utils/shellUtils";

export const runTSWorkflow = async (
  clientsLocation: string,
  openapiLocation: string,
  testsLocation: string
): Promise<void> => {
  const tsClientLocation = join(clientsLocation, "ts");
  const tsTestsLocation = join(testsLocation, "ts");
  await generateTSClient(openapiLocation, tsClientLocation);
  await execute("/bin/bash ./execute.sh", tsTestsLocation);
};

import { join } from "path";
import { generateTSClient } from "../generators/ts";
import { execute } from "../utils/shellUtils";

export const runTSWorkflow = async (
  clientsLocation: string,
  openapiLocation: string
): Promise<void> => {
  const tsClientLocation = join(clientsLocation, "ts");
  await generateTSClient(openapiLocation, tsClientLocation);
  await execute("/bin/bash ./execute.sh", tsClientLocation);
};

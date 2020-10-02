import { join } from "path";
import { buildTSClient } from "../builders/ts";
import { generateTSClient } from "../generators/ts/generate";

export const runTSWorkflow = async (
  clientsLocation: string,
  openapiLocation: string
): Promise<void> => {
  const tsClientLocation = join(clientsLocation, "ts");
  await generateTSClient(openapiLocation, tsClientLocation);
  await buildTSClient(tsClientLocation);
};

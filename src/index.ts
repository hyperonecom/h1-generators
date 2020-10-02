import { join } from "path";
import { GeneratorFunctionInput } from "./types";
import { runTSWorkflow } from "./workflows/ts";

const clientsLocation = join(__dirname, "..", "clients");
const openapiLocation = join(__dirname, "..", "openapi.json");
const testsLocation = join(__dirname, "..", "tests");

const generatorInput: GeneratorFunctionInput = {
  clientsLocation,
  openapiLocation,
  testsLocation,
};

const runAllWorkflows = async () => {
  return Promise.all([runTSWorkflow(generatorInput)]);
};

runAllWorkflows().catch((e) => {
  console.error(e);
  process.exit(1);
});

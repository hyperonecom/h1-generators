import { join } from "path";
import { runTSWorkflow } from "./workflows/ts";

const clientsLocation = join(__dirname, "..", "clients");
const openapiLocation = join(__dirname, "..", "openapi.json");
const testsLocation = join(__dirname, "..", "tests");

const runAllWorkflows = async () => {
  return Promise.all([
    runTSWorkflow(clientsLocation, openapiLocation, testsLocation),
  ]);
};

runAllWorkflows().catch((e) => {
  console.error(e);
  process.exit(1);
});

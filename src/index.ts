import { join } from "path";
import { runTSWorkflow } from "./workflows/ts";

const clientsLocation = join(__dirname, "..", "clients");
const openapiLocation = join(__dirname, "..", "openapi.json");

const runAllWorkflows = async () => {
  return Promise.all([runTSWorkflow(clientsLocation, openapiLocation)]);
};

runAllWorkflows();

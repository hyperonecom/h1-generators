import { join } from "path";
import { argv } from "process";
import { GeneratorFunctionInput, GeneratorFunction } from "./types";
import { runTSWorkflow } from "./workflows/ts";

const clientsLocation = join(__dirname, "..", "clients");
const openapiLocation = join(__dirname, "..", "openapi.json");
const testsLocation = join(__dirname, "..", "tests");
const [, , lang] = argv;

const generatorInput: GeneratorFunctionInput = {
  clientsLocation,
  openapiLocation,
  testsLocation,
};

const allWorkflows = new Map<string, GeneratorFunction>();
allWorkflows.set("ts", runTSWorkflow);

const runSelectedWorkflow = async () => {
  const workflow = allWorkflows.get(lang);
  if (typeof workflow !== "function") {
    console.error(`Can't find workflow for language: ${lang}`);
    process.exit(1);
  }

  workflow(generatorInput);
};

runSelectedWorkflow().catch((e) => {
  console.error(e);
  process.exit(1);
});

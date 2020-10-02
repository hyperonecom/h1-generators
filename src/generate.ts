import { generateTSClient } from "./generators/ts/generate";
import { join } from "path";

const openapiLocation = join(__dirname, "..", "openapi.json");
const clientsLocation = join(__dirname, "..", "clients");

generateTSClient(openapiLocation, join(clientsLocation, "ts")).catch((e) =>
  console.error(e)
);

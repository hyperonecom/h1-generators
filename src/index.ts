import { generateTSClient } from "./generators/ts/generate";
import { join } from "path";

generateTSClient(join(__dirname, "..", "openapi.json")).catch((e) =>
  console.log(e)
);

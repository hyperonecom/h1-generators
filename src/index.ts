import { generateTSClient } from "./generators/ts/generate";
import { join } from "path";

generateTSClient(
  join(__dirname, "..", "openapi.json"),
  join(__dirname, "..", "/clients", "ts")
).catch((e) => console.log(e));

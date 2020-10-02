import { join } from "path";
import { buildTSClient } from "./builders/ts/build";

const clientsLocation = join(__dirname, "..", "clients");

buildTSClient(join(clientsLocation, "ts"));

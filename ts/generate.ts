import { join } from "path";
import { execute } from "../utils/shellUtils";
import { replaceInManyFiles, findFiles } from "../utils/fileUtils";

const main = async () => {
  const openapi = join(__dirname, "openapi.json");
  const config = join(__dirname, "config.yaml");
  const generator = "typescript-axios";

  await execute(
    `openapi-generator generate -i ${openapi} -c ${config} -g ${generator}`
  );

  await execute("yarn add -D typedoc@0.19.2 typedoc-plugin-markdown@3.0.3");

  const typescriptFiles = await findFiles("ts");

  await replaceInManyFiles(typescriptFiles, "AnyType", "any");

  await execute("yarn typedoc --plugin typedoc-plugin-markdown");
  await execute("yarn build");
};

main().catch((e) => {
  console.error(`Error when generating client: ${e}`);
  process.exit(1);
});

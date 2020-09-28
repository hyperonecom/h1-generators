import { join } from "path";
import { execute } from "../../utils/shellUtils";
import { replaceInManyFiles, findFiles } from "../../utils/fileUtils";

export const generateTSClient = async (openapiFile: string): Promise<void> => {
  const config = join(__dirname, "config.yaml");
  const generator = "typescript-axios";

  await execute(
    `yarn openapi-generator generate -i ${openapiFile} -c ${config} -g ${generator}`
  );
  await execute("yarn add -D typedoc@0.19.2 typedoc-plugin-markdown@3.0.3");

  const typescriptFiles = await findFiles("ts");
  await replaceInManyFiles(typescriptFiles, "AnyType", "any");

  await execute("yarn typedoc --plugin typedoc-plugin-markdown");
  await execute("yarn build");
};

import { join } from "path";
import { execute } from "../../utils/shellUtils";
import { replaceInFiles, findFiles } from "../../utils/fileUtils";
import { copyLicense } from "../../utils/licenseUtils";

export const generateTSClient = async (
  openapiFile: string,
  outputDir: string
): Promise<void> => {
  const config = join(__dirname, "config.yaml");
  const generator = "typescript-axios";

  await execute(
    `yarn openapi-generator-cli generate -i ${openapiFile} -c ${config} -g ${generator} -o ${outputDir}`
  );
  await execute(
    "yarn add -D typedoc@0.19.2 typedoc-plugin-markdown@3.0.3",
    outputDir
  );

  const typescriptFiles = await findFiles(outputDir, "ts");
  await replaceInFiles(typescriptFiles, "AnyType", "any");
  await replaceInFiles(typescriptFiles, "source: ;", "source: any;");
  await replaceInFiles(typescriptFiles, "source?: ;", "source?: any;");

  const readmeFile = [join(outputDir, "package.json")];
  await replaceInFiles(readmeFile, "prepublishOnly", "prepack");

  await execute("rm -f README.md", outputDir);

  const readmeLocation = join(__dirname, "_README.md");
  await execute(`cp ${readmeLocation} README.md `, outputDir);

  await execute("yarn typedoc --plugin typedoc-plugin-markdown", outputDir);
  await execute("yarn build", outputDir);

  await copyLicense("MIT", outputDir);
};

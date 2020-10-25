import { join } from "path";
import { execute } from "../../utils/shellUtils";
import { copyLicense } from "../../utils/licenseUtils";

export const generatePythonClient = async (
  openapiFile: string,
  outputDir: string
): Promise<void> => {
  const config = join(__dirname, "config.yaml");
  const generator = "python";

  await execute(
    `yarn openapi-generator-cli generate -i ${openapiFile} -c ${config} -g ${generator} -o ${outputDir}`
  );

  await execute("mv README.md docs/README.md", outputDir);
  const replacementReadmeLocation = join(__dirname, "_README.md");
  await execute(`cp ${replacementReadmeLocation} README.md`, outputDir);

  await execute("pip install .", outputDir);

  await copyLicense("MIT", outputDir);
};

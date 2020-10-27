import { join } from "path";
import { execute } from "../../utils/shellUtils";
import { copyLicense } from "../../utils/licenseUtils";
import { fixPathsInReplacedReadme } from "../../utils/fileUtils";

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
  const readmeLocation = join(outputDir, "docs", "README.md");
  await fixPathsInReplacedReadme(readmeLocation);

  const pythonPackageLocation = join(outputDir, "h1");
  await execute(
    "cp configuration.py configuration_base.py",
    pythonPackageLocation
  );
  const customConfigurationFileLocation = join(__dirname, "_configuration.py");
  await execute(
    `cp ${customConfigurationFileLocation} configuration.py`,
    pythonPackageLocation
  );

  const replacementReadmeLocation = join(__dirname, "_README.md");
  await execute(`cp ${replacementReadmeLocation} README.md`, outputDir);

  await execute("pip install .", outputDir);

  await copyLicense("MIT", outputDir);
};

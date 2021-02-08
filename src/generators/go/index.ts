import { join } from "path";
import {
  findFiles,
  fixPathsInReplacedReadme,
  replaceInFiles,
} from "../../utils/fileUtils";
import { copyLicense } from "../../utils/licenseUtils";
import { execute } from "../../utils/shellUtils";

export const generateGoClient = async (
  openapiFile: string,
  outputDir: string
): Promise<void> => {
  const config = join(__dirname, "config.yaml");
  const generator = "go";

  await execute(
    `yarn openapi-generator-cli generate --git-user-id "hyperonecom" --git-repo-id "h1-client-go" -i ${openapiFile} -c ${config} -g ${generator} -o ${outputDir}`
  );

  const contextFileLocation = join(__dirname, "_passport_context.go");
  await execute(`cp ${contextFileLocation} passport_context.go `, outputDir);

  const goFiles = await findFiles(outputDir, "go");
  await replaceInFiles(goFiles, "OneOfAnyTypeAnyType", "interface{}");

  await execute("go get -u ./...", outputDir);

  await execute("mv README.md docs/README.md", outputDir);
  const readmeLocation = join(outputDir, "docs", "README.md");
  await fixPathsInReplacedReadme(readmeLocation);

  const replacementReadmeLocation = join(__dirname, "_README.md");
  await execute(`cp ${replacementReadmeLocation} README.md`, outputDir);

  await copyLicense("MIT", outputDir);
};

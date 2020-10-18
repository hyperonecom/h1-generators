import { join } from "path";
import { findFiles, replaceInManyFiles } from "../../utils/fileUtils";
import { execute } from "../../utils/shellUtils";

export const generateGoClient = async (
  openapiFile: string,
  outputDir: string
): Promise<void> => {
  const config = join(__dirname, "config.yaml");
  const generator = "go";

  await execute(
    `yarn openapi-generator-cli generate -i ${openapiFile} -c ${config} -g ${generator} -o ${outputDir}`
  );

  const contextFileLocation = join(__dirname, '_passport_context.go')
  await execute(`cp ${contextFileLocation} passport_context.go `, outputDir)

  const goFiles = await findFiles(outputDir, "go");
  await replaceInManyFiles(goFiles, "OneOfAnyTypeAnyType", "interface{}");

  await execute('go get -u ./...', outputDir)
  await execute('go test ./...', outputDir)
};

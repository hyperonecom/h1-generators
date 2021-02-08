import { join } from "path";
import { readFile, writeFile } from "fs/promises";

import { execute } from "../../utils/shellUtils";
import { copyLicense } from "../../utils/licenseUtils";
import { fixPathsInReplacedReadme } from "../../utils/fileUtils";

const dropObjectPattern = (s: any) => {
  if (!s.properties) return;
  for (const property of Object.values(s.properties)) {
    const p: any = property;
    delete p.pattern;
    if (p.items) {
      dropObjectPattern(p.items)
    }
  }
}

export const generatePythonClient = async (
  openapiFile: string,
  outputDir: string
): Promise<void> => {
  const config = join(__dirname, "config.yaml");
  const generator = "python";
  const specification = JSON.parse(await readFile(openapiFile, {
    encoding: 'utf-8'
  }));
  // python does not pass validation our regexp
  // example value: '.components.schemas.iam_project_policy_create.properties.resource'
  for (const schema of Object.values(specification.components.schemas)) {
    const s: any = schema;
    dropObjectPattern(s);
  }
  // example value: .paths["/iam/project/{projectId}/policy"].get.parameters
  for (const endpoint of Object.values(specification.paths)) {
    const e: any = endpoint;
    for (const operation of Object.values(e)) {
      const o: any = operation;
      if (!o.parameters) continue;
      for (const parameter of o.parameters) {
        const p: any = parameter;
        if (!p.schema) continue;
        delete p.schema.pattern;
      }
    }
  }
  await writeFile(openapiFile, JSON.stringify(specification, null, 4));
  await execute(
    `yarn openapi-generator-cli generate --git-user-id "hyperonecom" --git-repo-id "h1-client-python" -i ${openapiFile} -c ${config} -g ${generator} -o ${outputDir}`
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

  await execute("python -m pip install .", outputDir);

  await copyLicense("MIT", outputDir);
};

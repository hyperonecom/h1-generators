import { exec } from "child_process";
import { join } from "path";
import { readdirSync, readFileSync, writeFileSync } from "fs";

// findFiles finds files with given extension in current directory,
// but skips subdirectories
const findFiles = async (extension: string): Promise<string[]> => {
  const allFiles = readdirSync(__dirname);
  return allFiles.filter((file: string) => {
    return file.split(".").pop() === extension;
  });
};

const replaceInManyFiles = async (
  files: string[],
  textToReplace: string,
  replacementText: string
): Promise<void[]> => {
  return Promise.all(
    files.map(async (file: string) => {
      const content = readFileSync(file, "utf8");
      const replacedText = content.split(textToReplace).join(replacementText);
      return writeFileSync(file, replacedText, { encoding: "utf-8" });
    })
  );
};

const execute = async (cmd: string) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        console.log(stdout);
        console.error(stderr);
        resolve({ stdout, stderr });
      }
    });
  });
};

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

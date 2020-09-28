import { readdirSync, readFileSync, writeFileSync } from "fs";

// findFiles finds files with given extension in current directory,
// but skips subdirectories
export const findFiles = async (
  location: string,
  extension: string
): Promise<string[]> => {
  const allFiles = readdirSync(location);
  return allFiles.filter((file: string) => {
    return file.split(".").pop() === extension;
  });
};

export const replaceInManyFiles = async (
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

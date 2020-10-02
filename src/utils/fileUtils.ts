import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

// findFiles finds files with given extension in current directory,
// but skips subdirectories
export const findFiles = async (
  location: string,
  extension: string
): Promise<string[]> => {
  const allFiles = await readdir(location);
  return allFiles
    .filter((file: string) => {
      return file.split(".").pop() === extension;
    })
    .map((file) => join(location, file));
};

export const replaceInManyFiles = async (
  files: string[],
  textToReplace: string,
  replacementText: string
): Promise<void[]> => {
  return Promise.all(
    files.map(async (file: string) => {
      const content = await readFile(file, "utf8");
      const replacedText = content.split(textToReplace).join(replacementText);
      return writeFile(file, replacedText, { encoding: "utf-8" });
    })
  );
};

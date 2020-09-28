import { exec } from "child_process";

export const execute = async (cmd: string) => {
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

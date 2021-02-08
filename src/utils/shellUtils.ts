import { exec, ExecOptions } from "child_process";

const TEN_MEGA_BYTE = 1024 * 1024 * 10;

export const execute = async (cmd: string, cwd?: string) => {
  const options: ExecOptions = {};
  options.cwd = cwd;
  options.maxBuffer = TEN_MEGA_BYTE;

  return new Promise((resolve, reject) => {
    exec(cmd, options, (err, stdout, stderr) => {
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

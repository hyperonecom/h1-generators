import { execute } from "../../utils/shellUtils";

export const buildTSClient = async (clientLocation: string): Promise<void> => {
  await execute("yarn", clientLocation);
  await execute("yarn build", clientLocation);
  await test(clientLocation);
};

const test = async (clientLocation: string): Promise<unknown> => {
  return execute("/bin/bash ./execute.sh", clientLocation);
};

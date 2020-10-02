import { execute } from "../../utils/shellUtils";

export const buildTSClient = async (clientLocation: string): Promise<void> => {
  await execute("yarn", clientLocation);
  await execute("yarn build", clientLocation);
};

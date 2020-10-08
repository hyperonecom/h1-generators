import { execute } from "./shellUtils";

export interface PushRepositoryInput {
  repository: string;
  actor: string;
  token: string;
}

export const pushRepository = async ({
  actor,
  token,
  repository,
}: PushRepositoryInput) => {
  execute(
    `git push https://${actor}:${token}@github.com/${repository}.git" HEAD:master`
  );
};

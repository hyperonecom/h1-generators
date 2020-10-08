import { execute } from "./shellUtils";

export interface PushRepositoryInput {
  repository: string;
  token: string;
}

export const pushRepository = async ({
  token,
  repository,
}: PushRepositoryInput) => {
  const actor = process.env.GITHUB_ACTOR;
  execute(
    `git push https://${actor}:${token}@github.com/${repository}.git" HEAD:master`
  );
};

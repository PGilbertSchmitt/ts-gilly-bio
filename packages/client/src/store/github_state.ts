import { IRepo } from '@res/github_repo_response';
import { ICommit } from '@res/github_commit_response';
import { getRepos, getCommits } from '@api/github_api';
import { errorHooks } from './root_state';

export type RepoList = IRepo[];
export interface CommitState {
  [reponame: string]: ICommit[];
}

export const createGithubStore = () => {
  const repos: RepoList = [];
  const commits: CommitState = {};

  const githubStore = { repos, commits };

  const fetchGithubRepos = async () => {
    const repoResponse = await getRepos();
    if (repoResponse) {
      githubStore.repos = repoResponse.data;
    } else {
      errorHooks.pushError('Could not pull repos from github');
    }
  };

  const fetchGithubCommits = async (reponame: string) => {
    const commitResponse = await getCommits(reponame);
    if (commitResponse) {
      githubStore.commits[reponame] = commitResponse.data;
    } else {
      errorHooks.pushError(`Could not retrieve commits for repo: ${reponame}`);
    }
  };

  return {
    githubStore,
    githubHooks: {
      fetchGithubRepos,
      fetchGithubCommits,
    }
  };
};

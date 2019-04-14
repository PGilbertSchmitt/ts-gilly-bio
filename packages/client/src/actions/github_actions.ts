import { makeAction, makeEmptyAction } from '@util/action_types';
import {
  RECEIVE_REPOS,
  LOAD_GITHUB_DATA,
  RECEIVE_COMMITS,
} from '@util/constants';
import { IRepo } from '@res/github_repo_response';
import { ICommit } from '@res/github_commit_response';

export const receiveRepos = makeAction(RECEIVE_REPOS)(
  (repos: IRepo[]) => ({
    payload: repos,
  }),
);

export const receiveCommits = makeAction(RECEIVE_COMMITS)(
  (repo: string, commits: ICommit[]) => ({
    payload: {
      repo,
      commits,
    },
  }),
);

// Saga Actions

export const loadGithubData = makeEmptyAction(LOAD_GITHUB_DATA);

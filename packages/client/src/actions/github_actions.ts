import { makeAction, makeEmptyAction } from '@util/action_types';
import {
  RECEIVE_REPOS,
  LOAD_GITHUB_DATA,
} from '@util/constants';
import { IRepo } from '@res/github_repo_response';

export const receiveRepos = makeAction(RECEIVE_REPOS)((repos: IRepo[]) => ({
  payload: repos,
}));

// Saga Actions

export const loadGithubData = makeEmptyAction(LOAD_GITHUB_DATA);

import { Action } from 'redux';
import clone from 'ramda/src/clone';

import { isAction } from '@util/action_types';
import {
  receiveRepos,
} from '@actions/github_actions';
import { IRepo } from '@res/github_repo_response';

export type RepoState = IRepo[];

export const githubRepoReducer = (state: RepoState = [], action: Action): RepoState => {
  const newState = clone(state);

  if (isAction(action, receiveRepos)) {
    return action.payload;
  }

  return newState;
};

export interface CommitState {
  [reponame: string]: {
    id: number;
    thing: string;
  };
}

export const githubCommitReducer = (state: CommitState, action: Action) => {
  return {};
};

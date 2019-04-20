import { Action } from 'redux';
import mergeRight from 'ramda/src/mergeRight';

import { isAction } from '@util/action_types';
import {
  receiveRepos,
  receiveCommits,
} from '@actions/github_actions';
import { IRepo } from '@res/github_repo_response';
import { ICommit } from '@res/github_commit_response';

export type RepoState = IRepo[];

export const githubRepoReducer = (state: RepoState = [], action: Action): RepoState => {
  if (isAction(action, receiveRepos)) {
    return action.payload;
  }

  return state;
};

export interface CommitState {
  [reponame: string]: ICommit[];
}

export const githubCommitReducer = (state: CommitState = {}, action: Action): CommitState => {
  if (isAction(action, receiveCommits)) {
    const { payload: { repo, commits } } = action;
    return mergeRight(state, {
      [repo]: commits,
    });
  }

  return state;
};

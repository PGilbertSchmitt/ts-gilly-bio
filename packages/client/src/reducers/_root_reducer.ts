import { combineReducers } from 'redux';

import {
  RepoState,
  CommitState,
  githubRepoReducer,
  githubCommitReducer,
} from '@reducers/github_reducer';

export interface RootState {
  repos: RepoState;
  commits: CommitState;
}

export default combineReducers<RootState>({
  repos: githubRepoReducer,
  commits: githubCommitReducer,
});

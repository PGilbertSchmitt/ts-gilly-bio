import { combineReducers } from 'redux';

import {
  RepoState,
  CommitState,
  githubRepoReducer,
  githubCommitReducer,
} from '@reducers/github_reducer';

import {
  ProjectIndexState,
  ProjectState,
  projectIndexReducer,
  projectReducer,
} from '@reducers/project_reducer';

export interface RootState {
  repos: RepoState;
  commits: CommitState;
  projectIndex: ProjectIndexState;
  projects: ProjectState;
}

export default combineReducers<RootState>({
  repos: githubRepoReducer,
  commits: githubCommitReducer,
  projectIndex: projectIndexReducer,
  projects: projectReducer,
});

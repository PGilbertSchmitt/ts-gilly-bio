import { SagaIterator } from 'redux-saga';
import { takeLeading, put, call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import {
  receiveRepos,
  receiveCommits,
  GithubCommitAction,
} from '@actions/github_actions';

import {
  getRepos,
  getCommits,
} from '@api/github_api';

import {
  FETCH_GITHUB_REPOS,
  FETCH_GITHUB_COMMITS,
} from '@util/constants';
import { IRepo } from '@res/github_repo_response';
import { ICommit } from '@res/github_commit_response';

function* fetchGithubRepos(): SagaIterator {
  try {
    // Fetch repos
    const repoResponse: AxiosResponse<IRepo[]> = yield call(getRepos);
    yield put<any>(receiveRepos(repoResponse.data));
  } catch (e) {
    console.log('Cry');
    console.log(e);
  }
}

function* fetchGithubCommits({ payload: { repo } }: GithubCommitAction): SagaIterator {
  try {
    const commitResponse: AxiosResponse<ICommit[]> =
      yield call(() => getCommits(repo));
    yield put<any>(receiveCommits(repo, commitResponse.data));
  } catch (e) {
    console.log('Cry harder');
    console.log(e);
  }
}

export function* watchFetchGithubRepos(): SagaIterator {
  yield takeLeading<any>(FETCH_GITHUB_REPOS, fetchGithubRepos);
}

export function* watchFetchGithubCommits(): SagaIterator {
  yield takeLeading<any>(FETCH_GITHUB_COMMITS, (repo: GithubCommitAction) => fetchGithubCommits(repo));
}

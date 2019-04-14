import { SagaIterator } from 'redux-saga';
import { takeLeading, put, call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import {
  receiveRepos,
  receiveCommits,
} from '@actions/github_actions';

import {
  getRepos,
  getCommits,
} from '@api/github_api';

import { LOAD_GITHUB_DATA } from '@util/constants';
import { IRepo } from '@res/github_repo_response';
import { ICommit } from '@res/github_commit_response';

function* fetchGithubData(): SagaIterator {
  try {
    // Fetch repos
    const repoResponse: AxiosResponse<IRepo[]> = yield call(getRepos);
    const repos = repoResponse.data;
    yield put<any>(receiveRepos(repos));

    // Fetch commits for first repo (rest will load lazily)
    const firstRepo = repos[0].full_name;
    const commitResponse: AxiosResponse<ICommit[]> = yield call(() => getCommits(firstRepo));
    const commits = commitResponse.data;
    yield put<any>(receiveCommits(firstRepo, commits));
  } catch (e) {
    console.log('Cry');
    console.log(e);
  }
}

export function* watchLoadGithubData(): SagaIterator {
  yield takeLeading<any>(LOAD_GITHUB_DATA, fetchGithubData);
}

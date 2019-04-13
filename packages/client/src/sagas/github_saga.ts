import { SagaIterator } from 'redux-saga';
import { takeLeading, put, call } from 'redux-saga/effects';

import {
  receiveRepos,
} from '@actions/github_actions';

import {
  getRepos,
} from '@api/github_api';

import { LOAD_GITHUB_DATA } from '@util/constants';
import { IRepo } from '../resources/github_repo_response';
import { AxiosResponse } from 'axios';

function* fetchGithubData(): SagaIterator {
  try {
    // Fetch repos
    const response: AxiosResponse<IRepo[]> = yield call(getRepos);
    const repos = response.data;
    yield put<any>(receiveRepos(repos));

    // Fetch commits for first repo (rest will load lazily)
    // ...
  } catch (e) {
    console.log('Cry');
  }
}

export function* watchLoadGithubData(): SagaIterator {
  yield takeLeading<any>(LOAD_GITHUB_DATA, fetchGithubData);
}

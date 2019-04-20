import { SagaIterator } from 'redux-saga';
import { all, call } from 'redux-saga/effects';

import {
  watchFetchGithubRepos,
  watchFetchGithubCommits,
} from '@sagas/github_saga';

export default function* rootSaga(): SagaIterator {
  yield all([
    call(watchFetchGithubRepos),
    call(watchFetchGithubCommits),
  ]);
}

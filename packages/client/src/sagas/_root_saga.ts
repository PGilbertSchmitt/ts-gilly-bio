import { SagaIterator } from 'redux-saga';
import { all, call } from 'redux-saga/effects';

import {
  watchLoadGithubData,
} from '@sagas/github_saga';

export default function* rootSaga(): SagaIterator {
  yield all([
    call(watchLoadGithubData),
  ]);
}

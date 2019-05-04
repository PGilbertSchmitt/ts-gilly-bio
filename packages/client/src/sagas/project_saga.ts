import { SagaIterator } from 'redux-saga';
import { takeLeading, put, call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import {
  receiveProjectIndex,
  receiveProject,
  ProjectAction,
} from '@actions/project_actions';
import {
  getProjectIndex,
  getProject,
} from '@api/project_api';
import {
  FETCH_PROJECT_INDEX,
  FETCH_PROJECT,
} from '@util/constants';
import {
  IProjectIndexItem,
  IProject,
} from '@gilly/common';

function* fetchProjectIndex(): SagaIterator {
  try {
    const projectIndexResponse: AxiosResponse<IProjectIndexItem[]>
      = yield call(getProjectIndex);
    yield put<any>(receiveProjectIndex(projectIndexResponse.data));
  } catch (e) {
    console.log('No project index for you!');
    console.log(e);
  }
}

function* fetchProject({ payload: { slug } }: ProjectAction): SagaIterator {
  try {
    const projectResponse: AxiosResponse<IProject>
      = yield call(() => getProject(slug));
    yield put<any>(receiveProject(slug, projectResponse.data));
  } catch (e) {
    console.log('You want a project? Too bad!');
    console.log(e);
  }
}

export function* watchFetchProjectIndex(): SagaIterator {
  yield takeLeading<any>(FETCH_PROJECT_INDEX, fetchProjectIndex);
}

export function* watchFetchProject(): SagaIterator {
  yield takeLeading<any>(FETCH_PROJECT, fetchProject);
}

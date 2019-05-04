import { Action } from 'redux';
import mergeRight from 'ramda/es/mergeRight';

import { isAction } from '@util/action_types';
import {
  receiveProjectIndex,
  receiveProject,
} from '@actions/project_actions';
import {
  IProjectIndexItem,
  IProjectItem,
} from '@gilly/common';

export interface ProjectIndexState {
  loading: boolean;
  index: IProjectIndexItem[];
}

export const projectIndexReducer = (
  state: ProjectIndexState = {
    loading: true,
    index: [],
  },
  action: Action,
): ProjectIndexState => {
  if (isAction(action, receiveProjectIndex)) {
    return {
      loading: false,
      index: action.payload,
    };
  }

  // console.log('State:', state);
  return state;
};

export interface ProjectState {
  [slug: string]: IProjectItem;
}

export const projectReducer = (
  state: ProjectState = {},
  action: Action,
): ProjectState => {
  if (isAction(action, receiveProject)) {
    const { slug, project } = action.payload;
    return mergeRight(state, {
      [slug]: project,
    });
  }

  return state;
};

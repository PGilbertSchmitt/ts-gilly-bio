import { Action } from 'redux';
import mergeRight from 'ramda/es/mergeRight';
import clone from 'ramda/es/clone';

import { isAction } from '@util/action_types';
import {
  receiveProjectIndex,
  receiveProject,
  convertProject,
} from '@actions/project_actions';
import {
  IProjectIndexItem,
  IProjectItem,
} from '@gilly/common';
import project_item from '../components/content/projects/project_item';

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

interface ProjectItemState {
  converted: boolean;
  project: IProjectItem;
}

export interface ProjectState {
  [slug: string]: ProjectItemState;
}

export const projectReducer = (
  state: ProjectState = {},
  action: Action,
): ProjectState => {
  if (isAction(action, receiveProject)) {
    const { slug, project } = action.payload;
    const projectState: ProjectItemState = {
      project,
      converted: false,
    };

    return mergeRight(state, {
      [slug]: projectState,
    });
  }

  if (isAction(action, convertProject)) {
    const { slug, html } = action.payload;
    const updatedProject = mergeRight(
      clone(state[slug].project),
      {
        content: html,
      },
    );

    const projectState: ProjectItemState = {
      project: updatedProject,
      converted: true,
    };

    return mergeRight(state, {
      [slug]: projectState,
    });
  }

  return state;
};

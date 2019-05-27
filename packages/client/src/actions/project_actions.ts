import {
  makeAction,
  makeEmptyAction,
} from '@util/action_types';
import {
  FETCH_PROJECT_INDEX,
  FETCH_PROJECT,
  RECEIVE_PROJECT_INDEX,
  RECEIVE_PROJECT,
} from '@util/constants';
import {
  IProjectIndexItem,
  StateProjectItem,
} from '@gilly/common';

export const receiveProjectIndex = makeAction(RECEIVE_PROJECT_INDEX)(
  (projects: IProjectIndexItem[]) => ({
    payload: projects,
  }),
);

export const receiveProject = makeAction(RECEIVE_PROJECT)(
  (slug: string, project: StateProjectItem) => ({
    payload: {
      slug,
      project,
    },
  }),
);

// Saga Actions

export const fetchProjectIndex = makeEmptyAction(FETCH_PROJECT_INDEX);
export const fetchProject = makeAction(FETCH_PROJECT)(
  (slug: string) => ({
    payload: { slug },
  }),
);
export type ProjectAction = ReturnType<typeof fetchProject>;

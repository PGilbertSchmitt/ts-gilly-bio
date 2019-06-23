import merge from 'lodash/merge';

import {
  StateProjectIndexItem,
  StateProjectItem,
} from '@gilly/common';

import {
  getProjectIndex,
  getProject,
} from '@api/project_api';

import { parseMarkdown } from '@gilly/marker';

import { hooks } from './root_state';

export interface ProjectItemList {
  [slug: string]: StateProjectItem | null;
}

export const createProjectStore = () => {
  const projectIndex: StateProjectIndexItem[] = [];
  const projects: ProjectItemList = {};

  const projectStore = { projectIndex, projects };

  return {
    projectStore,
    projectHooks: {
      fetchProjects: async () => {
        const index = await getProjectIndex();
        if (index !== null) {
          projectStore.projectIndex = index.data;
        }
      },

      fetchProject: async (slug: string) => {
        const projectResponse = await getProject(slug);
        if (projectResponse !== null) {
          const responseObj = projectResponse.data;
          if ('title' in responseObj) {
            // Converting content string into marked object
            projectStore.projects[slug] = merge(
              responseObj,
              { content: parseMarkdown(responseObj.content) }
            );
          } else {
            // Must mean an error
            projectStore.projects[slug] = null;
            hooks.pushError(`No such project page: ${slug}`);
          }
        }
      },
    },
  };
};

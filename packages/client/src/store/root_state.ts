import { createProjectStore } from './project_state';
import { createGithubStore } from './github_state';
import { createErrorStore } from './error_state';

const {
  projectStore,
  projectHooks,
} = createProjectStore();

const {
  githubStore,
  githubHooks,
} = createGithubStore();

const {
  errorStore,
  errorHooks,
} = createErrorStore();

const store = {
  projectStore,
  githubStore,
  errorStore,
};

// DELETE, I don't necessarily need all the hooks in one place
const hooks = {
  ...errorHooks,
  ...githubHooks,
  ...projectHooks,
};
(window as any).hooks = hooks;
(window as any).store = store;

export {
  store,

  projectHooks,
  githubHooks,
  errorHooks,
};

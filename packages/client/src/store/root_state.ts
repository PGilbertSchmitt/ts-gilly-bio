import { createProjectStore } from './project_state';
import { createErrorStore } from './error_state';

const {
  projectStore,
  projectHooks,
} = createProjectStore();

const {
  errorStore,
  errorHooks,
} = createErrorStore();

const store = {
  projectStore,
  errorStore,
};

const hooks = {
  ...errorHooks,
  ...projectHooks,
};

// DELETE
(window as any).hooks = hooks;

export {
  store,
  hooks,
};

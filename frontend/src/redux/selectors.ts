import { RootStateWithRouter } from 'redux/types';

export const getCurrentProject = (state: RootStateWithRouter) => {
  const url = state.router.location.pathname;
  // eslint-disable-next-line
  const match = url.match(/project\/([a-zA-Z0-9\-]+)\//);
  if (match && state.entities.projects.byId) {
    return state.entities.projects.byId[match[1]];
  }

  return;
};

export const getCurrentProjectId = (state: RootStateWithRouter) => {
  const currentProject = getCurrentProject(state);
  if (undefined !== currentProject) {
    return currentProject.uuid;
  }

  return '';
};

export const getCurrentURL = (state: RootStateWithRouter) => {
  return state.router.location.pathname;
};

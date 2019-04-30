import { RootStateWithRouter } from 'redux/types';

export const getCurrentProject = (state: RootStateWithRouter) => {
  const url = state.router.location.pathname;
  const match = url.match(/project\/([a-zA-Z0-9\-]+)\//);
  if (match && state.projects.byId) {
    return state.projects.byId[match[1]];
  }
  return;
};

export const getCurrentURL = (state: RootStateWithRouter) => {
  return state.router.location.pathname;
};

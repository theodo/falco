import { RootStateWithRouter } from 'redux/types';

export const getCurrentProject = (state: RootStateWithRouter) => {
  const url = state.router.location.pathname;
  if (url) {
    return state.projects.byId[url.split('/')[2]];
  }
  return;
};

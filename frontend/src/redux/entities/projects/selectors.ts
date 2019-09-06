import { ProjectType, ToastrDisplayType } from 'redux/entities/projects/types';
import { RootState } from 'redux/types';

export const hasProjects = (state: RootState): boolean => {
  const projects = state.entities.projects.byId;
  if(!projects) { 
    return false 
  };
  return Object.keys(projects).length > 0;
};

export const getAllProjects = (state: RootState): ProjectType[] | null => {
  return state.entities.projects.byId
    ? Object.keys(state.entities.projects.byId)
      .map(projectId =>
        state.entities.projects.byId ? state.entities.projects.byId[projectId] : null,
      )
      .filter((project): project is ProjectType => project !== null)
    : null;
};

export const getProject = (state: RootState, projectId: string): ProjectType | null | undefined => {
  if (!state.entities.projects.byId) {
    return undefined;
  }
  return state.entities.projects.byId && state.entities.projects.byId[projectId];
};

export const getToastrDisplay = (state: RootState): ToastrDisplayType => {
  return state.entities.projects.toastrDisplay;
}

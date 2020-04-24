import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'redux/types';

import { fetchProjectsRequest, setProjectToastrDisplay } from './actions';
import { getAllProjects, getProject, getProjectToastrDisplay } from './selectors';
import { ProjectToastrDisplayType } from './types';

export const useAllProjects = () => {
  const projects = useSelector(getAllProjects);

  const dispatch = useDispatch();
  useEffect(
    () => {
      if (!projects) {
        dispatch(fetchProjectsRequest({}));
      }
    },
    [dispatch, projects],
  );

  return projects;
};

export const useProjectById = (projectId: string) => {
  const project = useSelector((state: RootState) => getProject(state, projectId));

  const dispatch = useDispatch();
  useEffect(
    () => {
      if (project === undefined) {
        dispatch(fetchProjectsRequest({ currentProjectId: projectId }));
      }
    },
    [dispatch, project, projectId],
  );

  return project;
};

export const useToastr = () => {
  const currentToastrDisplay = useSelector(getProjectToastrDisplay);

  const dispatch = useDispatch();
  const setToastrDisplay = useCallback(
    (display: ProjectToastrDisplayType) => {
      dispatch(setProjectToastrDisplay({ toastrDisplay: display }));
    },
    [dispatch],
  );
  const resetToastrDisplay = useCallback(
    () => {
      dispatch(setProjectToastrDisplay({ toastrDisplay: '' }));
    },
    [dispatch],
  );

  return { currentToastrDisplay, setToastrDisplay, resetToastrDisplay };
};

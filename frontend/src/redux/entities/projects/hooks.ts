import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'redux/types';

import { fetchProjectsRequest } from './actions';
import { getAllProjects, getProject } from './selectors';

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

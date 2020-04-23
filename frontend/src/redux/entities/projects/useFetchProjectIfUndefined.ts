import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'redux/types';

import { fetchProjectsRequest } from './actions';
import { getProject } from './selectors';
import { ProjectType } from './types';

export const useFetchProjectIfUndefined = (
  requestFetchProject: (projectId: string) => void,
  projectId: string,
  project?: ProjectType | null,
) => {
  useEffect(
    () => {
      if (project === undefined) {
        requestFetchProject(projectId);
      }
    },
    [requestFetchProject, project, projectId],
  );
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

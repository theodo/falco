import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from 'redux/types';

import {
  addMemberToProjectRequest,
  deleteMemberOfProjectRequest,
  editMemberOfProjectRequest,
  fetchProjectsRequest,
  setProjectToastrDisplay,
} from 'redux/entities/projects';
import { getProject, getProjectToastrDisplay } from 'redux/entities/projects/selectors';
import { ProjectToastrDisplayType } from 'redux/entities/projects/types';
import { getUser } from 'redux/user/selectors';
import MembersSettings, { OwnProps } from './MembersSettings';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  currentUser: getUser(state),
  project: getProject(state, props.match.params.projectId),
  toastrDisplay: getProjectToastrDisplay(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addMemberToProject: (projectId: string, userId: string) =>
    dispatch(addMemberToProjectRequest({ projectId, userId })),
  removeMemberOfProjectRequest: (projectId: string, userId: string) =>
    dispatch(deleteMemberOfProjectRequest({ projectId, userId })),
  editMemberOfProjectRequest: (projectId: string, userId: string, isAdmin: boolean) =>
    dispatch(editMemberOfProjectRequest({ projectId, userId, isAdmin })),
  fetchProjectsRequest: (projectId: string) =>
    dispatch(fetchProjectsRequest({ currentProjectId: projectId })),
  setProjectToastrDisplay: (toastrDisplay: ProjectToastrDisplayType) =>
    dispatch(setProjectToastrDisplay({ toastrDisplay })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MembersSettings);

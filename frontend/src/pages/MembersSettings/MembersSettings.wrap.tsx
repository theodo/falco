import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from 'redux/types';

import {
  addMemberToProjectRequest,
  deleteMemberOfProjectRequest,
  editMemberOfProjectRequest,
  setProjectToastrDisplay,
} from 'redux/entities/projects';
import { getProjectToastrDisplay } from 'redux/entities/projects/selectors';
import { ProjectToastrDisplayType } from 'redux/entities/projects/types';
import MembersSettings, { OwnProps } from './MembersSettings';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  toastrDisplay: getProjectToastrDisplay(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addMemberToProject: (projectId: string, userId: string) =>
    dispatch(addMemberToProjectRequest({ projectId, userId })),
  removeMemberOfProjectRequest: (projectId: string, userId: string) =>
    dispatch(deleteMemberOfProjectRequest({ projectId, userId })),
  editMemberOfProjectRequest: (projectId: string, userId: string, isAdmin: boolean) =>
    dispatch(editMemberOfProjectRequest({ projectId, userId, isAdmin })),
  setProjectToastrDisplay: (toastrDisplay: ProjectToastrDisplayType) =>
    dispatch(setProjectToastrDisplay({ toastrDisplay })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MembersSettings);

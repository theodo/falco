import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  addMemberToProjectRequest,
  deleteMemberOfProjectRequest,
  editMemberOfProjectRequest,
} from 'redux/entities/projects';
import MembersSettings from './MembersSettings';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addMemberToProject: (projectId: string, userId: string) =>
    dispatch(addMemberToProjectRequest({ projectId, userId })),
  removeMemberOfProjectRequest: (projectId: string, userId: string) =>
    dispatch(deleteMemberOfProjectRequest({ projectId, userId })),
  editMemberOfProjectRequest: (projectId: string, userId: string, isAdmin: boolean) =>
    dispatch(editMemberOfProjectRequest({ projectId, userId, isAdmin })),
});

export default connect(
  null,
  mapDispatchToProps,
)(MembersSettings);

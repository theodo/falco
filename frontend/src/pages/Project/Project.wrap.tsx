import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  setCurrentAuditParametersId,
  setCurrentPageId,
  setCurrentScriptId,
  setCurrentScriptStepId,
} from 'redux/parameters';

import { fetchProjectsRequest } from 'redux/entities/projects';
import { RootState } from 'redux/types';

import { getProject } from 'redux/entities/projects/selectors';
import Project, { OwnProps } from './Project';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  project: getProject(state, props.match.params.projectId),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProjectsRequest: (projectId: string) =>
    dispatch(fetchProjectsRequest({ currentProjectId: projectId })),
  setCurrentAuditParametersId: (auditParametersId: string | null | undefined) =>
    dispatch(setCurrentAuditParametersId({ auditParametersId })),
  setCurrentPageId: (pageId: string | null | undefined) => dispatch(setCurrentPageId({ pageId })),
  setCurrentScriptId: (scriptId: string | null | undefined) =>
    dispatch(setCurrentScriptId({ scriptId })),
  setCurrentScriptStepId: (scriptStepId: string | null | undefined) =>
    dispatch(setCurrentScriptStepId({ scriptStepId })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Project);

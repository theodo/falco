import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  setCurrentAuditParametersId,
  setCurrentPageId,
  setCurrentScriptId,
  setCurrentScriptStepId,
} from 'redux/parameters';

import { fetchProjectRequest } from 'redux/projects';
import { RootState } from 'redux/types';

import Project, { OwnProps } from './Project';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  project: state.projects.byId ? state.projects.byId[props.match.params.projectId] : undefined,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProjectRequest: (projectId: string) => dispatch(fetchProjectRequest({ projectId })),
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
)(injectIntl(Project));

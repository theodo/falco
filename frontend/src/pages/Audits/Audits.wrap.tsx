import { connect } from 'react-redux';
import { selectAuditScriptSteps } from 'redux/auditResults/selectors';
import {
  setCurrentAuditParametersId,
  setCurrentPageId,
  setCurrentScriptId,
  setCurrentScriptStepId,
} from 'redux/parameters';
import { fetchProjectRequest } from 'redux/projects';
import { modelizePages, modelizeScripts } from 'redux/projects/modelizer';
import { selectAuditParametersAsDict } from 'redux/projects/selectors';
import { RootState } from 'redux/types';

import { injectIntl } from 'react-intl';
import { Dispatch } from 'redux';
import { fetchAuditResultsRequest } from 'redux/auditResults';
import { Audits, OwnProps } from './Audits';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  project: state.projects.byId ? state.projects.byId[props.match.params.projectId] : undefined,
  page:
    state.projects.byId && state.projects.byId[props.match.params.projectId]
      ? modelizePages(state.projects.byId[props.match.params.projectId].pages)[
          props.match.params.pageOrScriptId
        ]
      : undefined,
  script:
    state.projects.byId && state.projects.byId[props.match.params.projectId]
      ? modelizeScripts(state.projects.byId[props.match.params.projectId].scripts)[
          props.match.params.pageOrScriptId
        ]
      : undefined,
  auditParameters: selectAuditParametersAsDict(state, props.match.params.projectId),
  sortedPageAuditResultsIds: state.auditResults.sortedByPageId[props.match.params.pageOrScriptId],
  sortedScriptAuditResultsIds:
    state.auditResults.sortedByScriptId[props.match.params.pageOrScriptId],
  scriptSteps: selectAuditScriptSteps(state, props.match.params.pageOrScriptId),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAuditResultsRequest: (id: string, type: 'page' | 'script') =>
    dispatch(fetchAuditResultsRequest({ id, type })),
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
)(injectIntl(Audits));

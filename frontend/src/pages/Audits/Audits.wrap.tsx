import { connect } from 'react-redux';
import {
  selectAuditScriptSteps,
  selectPageAuditResultsIds,
  selectScriptAuditResultsIds,
} from 'redux/auditResults/selectors';
import { fetchProjectRequest } from 'redux/entities/projects';
import { modelizeScripts } from 'redux/entities/projects/modelizer';
import { selectAuditParametersAsDict } from 'redux/entities/projects/selectors';
import {
  setCurrentAuditParametersId,
  setCurrentPageId,
  setCurrentScriptId,
  setCurrentScriptStepId,
} from 'redux/parameters';
import { RootState } from 'redux/types';

import { injectIntl } from 'react-intl';
import { Dispatch } from 'redux';
import { fetchAuditResultsRequest } from 'redux/auditResults';
import { modelizePagesToById } from 'redux/entities/pages/modelizer';
import { Audits, OwnProps } from './Audits';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  project: state.entities.projects.byId ? state.entities.projects.byId[props.match.params.projectId] : undefined,
  page:
    state.entities.projects.byId && state.entities.projects.byId[props.match.params.projectId]
      ? modelizePagesToById(state.entities.projects.byId[props.match.params.projectId].pages)[
      props.match.params.pageOrScriptId
      ]
      : undefined,
  script:
    state.entities.projects.byId && state.entities.projects.byId[props.match.params.projectId]
      ? modelizeScripts(state.entities.projects.byId[props.match.params.projectId].scripts)[
      props.match.params.pageOrScriptId
      ]
      : undefined,
  auditParameters: selectAuditParametersAsDict(state, props.match.params.projectId),
  sortedPageAuditResultsIds: selectPageAuditResultsIds(
    state,
    props.match.params.auditParametersId,
    props.match.params.pageOrScriptId,
  ),
  sortedScriptAuditResultsIds: selectScriptAuditResultsIds(
    state,
    props.match.params.auditParametersId,
    props.match.params.pageOrScriptId,
  ),
  scriptSteps: selectAuditScriptSteps(
    state,
    props.match.params.auditParametersId,
    props.match.params.pageOrScriptId,
  ),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAuditResultsRequest: (
    auditParametersId: string,
    pageOrScriptId: string,
    type: 'page' | 'script',
  ) => dispatch(fetchAuditResultsRequest({ auditParametersId, pageOrScriptId, type })),
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

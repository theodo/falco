import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  setCurrentAuditParametersId,
  setCurrentPageId,
  setCurrentScriptId,
  setCurrentScriptStepId,
} from 'redux/parameters';

import Project from './Project';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCurrentAuditParametersId: (auditParametersId: string | null | undefined) =>
    dispatch(setCurrentAuditParametersId({ auditParametersId })),
  setCurrentPageId: (pageId: string | null | undefined) => dispatch(setCurrentPageId({ pageId })),
  setCurrentScriptId: (scriptId: string | null | undefined) =>
    dispatch(setCurrentScriptId({ scriptId })),
  setCurrentScriptStepId: (scriptStepId: string | null | undefined) =>
    dispatch(setCurrentScriptStepId({ scriptStepId })),
});

export default connect(null, mapDispatchToProps)(Project);

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setProjectToastrDisplay } from 'redux/entities/projects';
import { deleteScriptFromProjectSuccess } from 'redux/entities/projects/actions';
import { ProjectToastrDisplayType } from 'redux/entities/projects/types';
import { getScript } from 'redux/entities/scripts/selectors';
import { RootState } from 'redux/types';
import { OwnProps, ScriptRow } from './ScriptRow';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  script: getScript(state, props.scriptId || ''),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  deleteScriptFromProjectSuccess: (payload: { projectId: string; scriptId: string }) =>
    dispatch(deleteScriptFromProjectSuccess(payload)),
  setProjectToastrDisplay: (toastrDisplay: ProjectToastrDisplayType) =>
    dispatch(setProjectToastrDisplay({ toastrDisplay })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScriptRow);

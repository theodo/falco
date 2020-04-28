import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addScriptToProjectSuccess } from 'redux/entities/projects';
import { addScript, editScriptSuccess } from 'redux/entities/scripts';
import { getScript } from 'redux/entities/scripts/selectors';
import { ScriptType } from 'redux/entities/scripts/types';
import { RootState } from 'redux/types';
import { OwnProps, ScriptModal } from './ScriptModal';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  script: getScript(state, props.scriptId),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addScriptToProjectSuccess: (projectId: string, scriptId: string) =>
    dispatch(addScriptToProjectSuccess({ projectId, scriptId })),
  addScript: (byId: Record<string, ScriptType>) => dispatch(addScript({ byId })),
  editScriptSuccess: (byId: Record<string, ScriptType>) => dispatch(editScriptSuccess({ byId })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScriptModal);

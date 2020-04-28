import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addScriptToProjectSuccess, setProjectToastrDisplay } from 'redux/entities/projects';
import { ProjectToastrDisplayType } from 'redux/entities/projects/types';
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
  setProjectToastrDisplay: (toastrDisplay: ProjectToastrDisplayType) =>
    dispatch(setProjectToastrDisplay({ toastrDisplay })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScriptModal);

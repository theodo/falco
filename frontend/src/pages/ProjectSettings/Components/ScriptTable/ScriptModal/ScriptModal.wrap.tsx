import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addScriptToProjectSuccess, setProjectToastrDisplay } from 'redux/entities/projects';
import { ProjectToastrDisplayType } from 'redux/entities/projects/types';
import { addScript } from 'redux/entities/scripts';
import { ScriptType } from 'redux/entities/scripts/types';
import { ScriptModal } from './ScriptModal';

const mapStateToProps = null;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addScriptToProjectSuccess: (projectId: string, scriptId: string) => dispatch(addScriptToProjectSuccess({ projectId, scriptId })),
  addScript: (byId: Record<string, ScriptType>) => dispatch(addScript({ byId })),
  setProjectToastrDisplay: (toastrDisplay: ProjectToastrDisplayType) => dispatch(setProjectToastrDisplay({toastrDisplay})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(ScriptModal));

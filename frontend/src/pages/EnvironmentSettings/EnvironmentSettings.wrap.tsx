import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from 'redux/types';

import { setProjectToastrDisplay } from 'redux/entities/projects';
import { getProjectToastrDisplay } from 'redux/entities/projects/selectors';
import { ProjectToastrDisplayType } from 'redux/entities/projects/types';
import EnvironmentSettings, { OwnProps } from './EnvironmentSettings';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  toastrDisplay: getProjectToastrDisplay(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setProjectToastrDisplay: (toastrDisplay: ProjectToastrDisplayType) =>
    dispatch(setProjectToastrDisplay({ toastrDisplay })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnvironmentSettings);

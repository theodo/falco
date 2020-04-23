import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from 'redux/types';

import { editProjectDetailsRequest, setProjectToastrDisplay } from 'redux/entities/projects';
import { getProjectToastrDisplay } from 'redux/entities/projects/selectors';
import { ProjectToastrDisplayType } from 'redux/entities/projects/types';
import { getUser } from 'redux/user/selectors';
import GeneralSettings, { OwnProps } from './GeneralSettings';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  currentUser: getUser(state),
  toastrDisplay: getProjectToastrDisplay(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setProjectToastrDisplay: (toastrDisplay: ProjectToastrDisplayType) =>
    dispatch(setProjectToastrDisplay({ toastrDisplay })),
  editProjectDetailsRequest: (
    projectId: string,
    payload: { name: string; wpt_api_key: string; wpt_instance_url: string },
  ) => dispatch(editProjectDetailsRequest({ projectId, payload })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GeneralSettings);

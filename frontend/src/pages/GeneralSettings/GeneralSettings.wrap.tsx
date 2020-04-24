import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { editProjectDetailsRequest } from 'redux/entities/projects';
import GeneralSettings from './GeneralSettings';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editProjectDetailsRequest: (
    projectId: string,
    payload: { name: string; wpt_api_key: string; wpt_instance_url: string },
  ) => dispatch(editProjectDetailsRequest({ projectId, payload })),
});

export default connect(
  null,
  mapDispatchToProps,
)(GeneralSettings);

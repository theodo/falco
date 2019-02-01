import { push } from 'connected-react-router';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import { actions } from 'redux/Avatar';
import { RootState } from 'redux/types';
import Avatar from './Avatar';

const mapStateToProps = (state: RootState) => ({
  username: state.avatar.username,
  userAvatarUrl: state.avatar.userAvatarUrl,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUser: (username: string) => dispatch(actions.fetchUserRequest({ username })),
  push: (pathName: string) => dispatch(push(pathName)),
  updateUsername: (username: string) => dispatch(actions.updateUsername({ username })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(Avatar));

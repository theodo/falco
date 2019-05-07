import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Dispatch } from 'redux';
import { logoutUserRequest } from 'redux/login';
import { RootState } from 'redux/types';
import { fetchUserRequest } from 'redux/user';
import { AccountMenu } from './AccountMenu';

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  userToken: state.login.token,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUserRequest: () => dispatch(fetchUserRequest({})),
  logoutUserRequest: () => dispatch(logoutUserRequest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(injectIntl(AccountMenu)));

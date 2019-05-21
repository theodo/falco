import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Dispatch } from 'redux';
import { getIsAuthenticated, logoutUser } from 'redux/login';
import { RootState } from 'redux/types';
import { fetchUserRequest } from 'redux/user';
import { AccountMenu } from './AccountMenu';

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  isUserAuthenticated: getIsAuthenticated(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUserRequest: () => dispatch(fetchUserRequest({})),
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(injectIntl(AccountMenu)));

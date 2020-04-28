import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Dispatch } from 'redux';
import { getIsAuthenticated, logoutUserRequest } from 'redux/login';
import { RootState } from 'redux/types';
import { getUser } from 'redux/user/selectors';
import { AccountMenu } from './AccountMenu';

const mapStateToProps = (state: RootState) => ({
  user: getUser(state),
  isUserAuthenticated: getIsAuthenticated(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logoutUser: (redirectTo?: string | undefined) => dispatch(logoutUserRequest({ redirectTo })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AccountMenu));

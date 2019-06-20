import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Dispatch } from 'redux';
import { fetchLastUpdateOfWhatsNew, registerClickOnWhatsNew } from 'redux/content';
import { getShouldDisplayWhatsNewNotification } from 'redux/content/selectors';
import { getIsAuthenticated, logoutUserRequest } from 'redux/login';
import { RootState } from 'redux/types';
import { fetchUserRequest } from 'redux/user';
import { AccountMenu } from './AccountMenu';

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  isUserAuthenticated: getIsAuthenticated(state),
  shouldDisplayWhatsNewNotification: getShouldDisplayWhatsNewNotification(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUserRequest: () => dispatch(fetchUserRequest({})),
  fetchLastUpdateOfWhatsNewRequest: () => dispatch(fetchLastUpdateOfWhatsNew.request({})),
  registerNewClickOnWhatsNew: (newClickTime: string | null) => dispatch(
    registerClickOnWhatsNew({ lastClickOnWhatsNew: newClickTime })
  ),
  logoutUser: (redirectTo?: string | undefined) => dispatch(logoutUserRequest({ redirectTo })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(injectIntl(AccountMenu)));

import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getCurrentURL } from 'redux/selectors';
import { RootStateWithRouter } from 'redux/types';
import { fetchUserRequest } from 'redux/user';
import { getUser } from 'redux/user/selectors';
import { Header } from './Header';

const mapStateToProps = (state: RootStateWithRouter) => ({
  user: getUser(state),
  currentURL: getCurrentURL(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUserRequest: () => dispatch(fetchUserRequest({})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(Header));

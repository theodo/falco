import { connect } from 'react-redux';
import { RootStateWithRouter } from 'redux/types';

import { getCurrentURL } from 'redux/selectors';
import { Header } from './Header';

const mapStateToProps = (state: RootStateWithRouter) => ({
  currentURL: getCurrentURL(state),
});

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

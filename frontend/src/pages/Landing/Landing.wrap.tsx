import { connect } from 'react-redux';
import { getIsAuthenticated } from 'redux/login';
import { RootStateWithRouter } from 'redux/types';
import { Landing } from './Landing';

const mapStateToProps = (state: RootStateWithRouter) => ({
  isUserAuthenticated: getIsAuthenticated(state),
});

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Landing);

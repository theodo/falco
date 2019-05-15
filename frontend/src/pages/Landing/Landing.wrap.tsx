import { connect } from 'react-redux';
import { selectIsAuthenticated } from 'redux/login';
import { RootStateWithRouter } from 'redux/types';
import { Landing } from './Landing';

const mapStateToProps = (state: RootStateWithRouter) => ({
  isUserAuthenticated: selectIsAuthenticated(state),
});

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Landing);

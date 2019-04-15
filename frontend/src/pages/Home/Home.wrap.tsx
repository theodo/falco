import { connect } from 'react-redux';
import { selectIsAuthenticated } from 'redux/login';
import { RootState } from 'redux/types';
import Home from './Home';

const mapStateToProps = (state: RootState) => ({
  isUserAuthenticated: selectIsAuthenticated(state),
});

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getIsAuthenticated } from 'redux/login';
import { RootStateWithRouter } from 'redux/types';

import Root from './Root';

const mapStateToProps = (state: RootStateWithRouter) => ({
    isUserAuthenticated: getIsAuthenticated(state)
  });

export default connect(
    mapStateToProps
  )(withRouter(Root));

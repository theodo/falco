import { connect } from 'react-redux';
import { RootStateWithRouter } from 'redux/types';

import { getCurrentProject, getCurrentURL } from 'redux/selectors';
import { Menu } from './Menu';

const mapStateToProps = (state: RootStateWithRouter) => ({
  project: getCurrentProject(state),
  currentURL: getCurrentURL(state),
});

export default connect(
  mapStateToProps,
  null,
)(Menu);

import { connect } from 'react-redux';
import { RootStateWithRouter } from 'redux/types';

import { getCurrentProject } from 'redux/selectors';
import { Menu } from './Menu';

const mapStateToProps = (state: RootStateWithRouter) => ({
  project: getCurrentProject(state),
});

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);

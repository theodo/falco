import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import { getUser } from 'redux/user/selectors';
import CreatProject from './CreateProject';

const mapStateToProps = (state: RootState) => ({
  user: getUser(state),
});

export default connect(
  mapStateToProps,
)(CreatProject);

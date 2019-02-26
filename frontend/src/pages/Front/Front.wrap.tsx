import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Front from './Front';
import { fetchProjectRequest } from 'redux/projects';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProjectRequest: (projectId: string) => dispatch(fetchProjectRequest({ projectId })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Front);

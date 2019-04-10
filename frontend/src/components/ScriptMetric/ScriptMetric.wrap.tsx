import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from 'redux/types';
import PageMetric, { OwnProps } from './ScriptMetric';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  script: state.scripts.byId[props.scriptId],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageMetric);

import { connect } from 'react-redux';
import { selectAuditResultsAsGraphData } from 'redux/auditResults/selectors';
import { RootState } from 'redux/types';
import { GraphsBlock, OwnProps } from './GraphsBlock';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  auditResults: props.auditResultIds
    ? selectAuditResultsAsGraphData(state, props.auditResultIds, props.metrics)
    : null,
});

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GraphsBlock);

import { connect } from 'react-redux';
import { selectAuditResultsAsGraphData } from 'redux/auditResults/selectors';
import { RootState } from 'redux/types';
import AuditResultsContainer, { OwnProps } from './AuditResultsGraph';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  auditResults: selectAuditResultsAsGraphData(state, props.auditResultIds, props.metrics),
});

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuditResultsContainer);

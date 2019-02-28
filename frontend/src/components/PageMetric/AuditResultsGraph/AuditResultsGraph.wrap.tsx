import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import AuditResultsContainer, { OwnProps } from './AuditResultsGraph';
import { RootState } from 'redux/types';
import { selectAuditResultsAsGraphData } from 'redux/auditResults/selectors';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  auditResults: selectAuditResultsAsGraphData(state, props),
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuditResultsContainer);

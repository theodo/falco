import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectAuditResultsAsGraphData } from 'redux/auditResults/selectors';
import { RootState } from 'redux/types';
import AuditResultsContainer, { OwnProps } from './AuditResultsGraph';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  auditResults: selectAuditResultsAsGraphData(state, props),
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuditResultsContainer);

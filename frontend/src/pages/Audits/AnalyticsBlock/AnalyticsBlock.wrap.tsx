import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import { AnalyticsBlock, OwnProps } from './AnalyticsBlock';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  auditResults: props.auditResultIds
    ? props.auditResultIds.map((auditId) => state.auditResults.byAuditId[auditId])
    : null,
});

export default connect(mapStateToProps)(AnalyticsBlock);

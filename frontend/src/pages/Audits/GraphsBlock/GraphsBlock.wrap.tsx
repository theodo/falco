import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { selectAuditResultsAsGraphData } from 'redux/auditResults/selectors';
import { getMetricsToDisplay } from 'redux/parameters/selectors';
import { RootState } from 'redux/types';
import { GraphsBlock, OwnProps } from './GraphsBlock';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  auditResults: props.auditResultIds
    ? selectAuditResultsAsGraphData(state, props.auditResultIds, getMetricsToDisplay(state))
    : null,
  metrics: getMetricsToDisplay(state),
});

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(GraphsBlock));

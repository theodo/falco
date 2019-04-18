import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import MetricGraph from './MetricGraph';

const mapStateToProps = null;
const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(MetricGraph));

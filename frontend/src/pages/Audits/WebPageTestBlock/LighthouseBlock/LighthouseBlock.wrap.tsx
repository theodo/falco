import { connect } from 'react-redux';
import { selectAuditResultsAsGraphData } from 'redux/auditResults/selectors';
import { RootState } from 'redux/types';
import LighthouseBlock, { OwnProps } from './LighthouseBlock';

const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LighthouseBlock);

import { connect } from 'react-redux';
import { RootState } from 'redux/types';
import WebPageTest, { OwnProps } from './WebPageTest';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  auditResults: props.auditResultIds
    ? props.auditResultIds.map(auditId => state.auditResults.byAuditId[auditId])
    : null,
});

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WebPageTest);

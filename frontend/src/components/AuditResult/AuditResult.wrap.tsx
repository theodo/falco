import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import AuditResult, { OwnProps } from './AuditResult';
import { RootState } from 'redux/types';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  auditResult: state.auditResults.byAuditId[props.auditId],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuditResult);

import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { getAuditParameters } from 'redux/entities/auditParameters/selectors';
import { RootState } from 'redux/types';
import { AuditParameterRow, OwnProps } from './AuditParameterRow';

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  auditParameter: getAuditParameters(state, props.auditParameterId || ""),
});


export default connect(
  mapStateToProps,
)(injectIntl(AuditParameterRow));

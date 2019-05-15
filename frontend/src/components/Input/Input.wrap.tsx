import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import Input from './Input';

const mapStateToProps = null;
const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(Input));

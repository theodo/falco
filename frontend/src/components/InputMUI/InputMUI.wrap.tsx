import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import InputMUI from './InputMUI';

const mapStateToProps = null;
const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(InputMUI));

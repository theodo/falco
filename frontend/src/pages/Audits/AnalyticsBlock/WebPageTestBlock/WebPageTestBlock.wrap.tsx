import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import WebPageTestBlock from './WebPageTestBlock';

const mapStateToProps = null;

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(WebPageTestBlock));

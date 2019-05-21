import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import GraphModal from './GraphModal';

const mapStateToProps = null;
const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(GraphModal));

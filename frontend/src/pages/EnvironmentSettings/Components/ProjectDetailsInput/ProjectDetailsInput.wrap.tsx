import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { ProjectDetailsInput } from './ProjectDetailsInput';

const mapStateToProps = null;
const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(ProjectDetailsInput));

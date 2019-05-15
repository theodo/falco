import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import LeadFormContainer from './LeadForm';

const mapStateToProps = null;

const mapDispatchToProps = null;

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LeadFormContainer),
);

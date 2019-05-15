import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Dispatch } from 'redux';
import { createLeadRequest } from 'redux/lead';

import LeadFormContainer from './LeadForm';
import { FormValues } from './service';

const mapStateToProps = null;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createLead: (values: FormValues) => dispatch(createLeadRequest(values)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LeadFormContainer),
);

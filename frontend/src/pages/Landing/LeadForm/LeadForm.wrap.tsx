import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Dispatch } from 'redux';
import { createLeadRequest } from 'redux/lead';
import { getLeadSubmissionStatus } from 'redux/lead/selectors';
import { RootState } from 'redux/types';

import LeadFormContainer from './LeadForm';
import { FormValues } from './service';

const mapStateToProps = (state: RootState) => ({
  leadSubmissionStatus: getLeadSubmissionStatus(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createLead: (values: FormValues) => dispatch(createLeadRequest(values)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LeadFormContainer),
);
